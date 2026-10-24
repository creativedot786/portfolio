"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
// NOTE: upstream imports "./motion-cursor-multifollow-utils/index.css" here.
// 21st ships no such file with this component (registryDependencies is empty),
// so the import is removed. `.cursor-stage` is defined in src/styles/global.css.

function usePointerPosition() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // LOCAL FIX. Upstream treats a position of 0 as "the pointer hasn't moved yet" and centres the cursor,
  // so touching the window's left or top edge (x or y = 0) sent it flying to the middle of the screen.
  // Whether the pointer has moved is its own flag.
  const moved = useRef(false)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      moved.current = true
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [x, y])

  return { x, y, moved }
}

type Kind = "default" | "text" | "magnetic"

type CursorState = {
  stageRef: RefObject<HTMLDivElement | null>
  kind: Kind
  caret: number
  targetBoundingBox: DOMRect | null
  pressed: boolean
  hovered: boolean
  zone: string | null
}

// LOCAL ADDITION. Upstream listens for press on the Stage element. Site-wide, that element
// must be click-through or it would swallow every click on the page, so it never hears one.
// These listeners sit on the window instead, and also drive the hover expansion.
const INTERACTIVE = 'a, button, [role="button"], [role="tab"], input, textarea, select, label, [data-cursor-expand]'

function useWindowPointer() {
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [inverted, setInverted] = useState(false)
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const down = () => setPressed(true)
    const up = () => setPressed(false)
    const over = (e: PointerEvent) => {
      const el = e.target as Element | null
      // LOCAL ADDITION: an element with data-cursor-label (the work images) gets a tag beside the cursor
      // instead of the hover expansion
      const lab = el?.closest?.("[data-cursor-label]") as HTMLElement | null
      setLabel(lab?.dataset.cursorLabel ?? null)
      setHovered(!lab && Boolean(el?.closest?.(INTERACTIVE)))
      setInverted(Boolean(el?.closest?.("[data-cursor-invert]")))
    }
    const leave = () => { setPressed(false); setHovered(false); setInverted(false); setLabel(null) }
    window.addEventListener("pointerdown", down)
    window.addEventListener("pointerup", up)
    window.addEventListener("pointerover", over)
    document.documentElement.addEventListener("pointerleave", leave)
    return () => {
      window.removeEventListener("pointerdown", down)
      window.removeEventListener("pointerup", up)
      window.removeEventListener("pointerover", over)
      document.documentElement.removeEventListener("pointerleave", leave)
    }
  }, [])

  return { pressed, hovered, inverted, label }
}

const CursorCtx = createContext<CursorState | null>(null)

function useCursorState() {
  const ctx = useContext(CursorCtx)
  if (!ctx) throw new Error("Cursor must render inside Stage")
  return ctx
}

function Stage({
  children,
  className = "cursor-stage",
}: {
  children: ReactNode
  className?: string
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [kind, setKind] = useState<Kind>("default")
  const [caret, setCaret] = useState(18)
  const [targetBoundingBox, setTarget] = useState<DOMRect | null>(null)
  const [zone, setZone] = useState<string | null>(null)
  const { pressed, hovered, inverted, label } = useWindowPointer()   // LOCAL: was local state on this div

  return (
    <CursorCtx.Provider
      value={{ stageRef, kind, caret, targetBoundingBox, pressed, hovered, zone }}
    >
      <div
        ref={stageRef}
        className={`${className}${inverted ? " is-inverted" : ""}${hovered ? " is-hovering" : ""}`}
        onPointerLeave={() => {
          setKind("default")
          setTarget(null)
          setZone(null)
        }}
        onPointerMove={(e) => {
          const el = e.target as HTMLElement
          const zoneEl = el.closest("[data-cursor-zone]") as HTMLElement | null
          setZone(zoneEl?.dataset.cursorZone ?? null)
          const mag = el.closest("[data-magnetic]") as HTMLElement | null
          if (mag) {
            setKind("magnetic")
            setTarget(mag.getBoundingClientRect())
            return
          }
          const text = el.closest("[data-cursor-text]") as HTMLElement | null
          if (text) {
            const lh = parseFloat(getComputedStyle(text).lineHeight)
            setCaret(Number.isFinite(lh) ? lh : 18)
            setKind("text")
            setTarget(text.getBoundingClientRect())
            return
          }
          setKind("default")
          setTarget(null)
        }}
      >
        {children}
        <CursorTag label={label} />
      </div>
    </CursorCtx.Provider>
  )
}

// LOCAL ADDITION. A small tag that rides just below and to the right of the cursor, over anything with
// data-cursor-label. It follows the pointer a touch behind the dot, and keeps its words while it fades out.
function CursorTag({ label }: { label: string | null }) {
  const { stageRef } = useCursorState()
  const pointer = usePointerPosition()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 600, damping: 45 })
  const y = useSpring(rawY, { stiffness: 600, damping: 45 })
  const [text, setText] = useState(label)
  useEffect(() => { if (label) setText(label) }, [label])
  useEffect(() => {
    const sync = () => {
      const sr = stageRef.current?.getBoundingClientRect()
      if (!sr) return
      rawX.set(pointer.x.get() - sr.left)
      rawY.set(pointer.y.get() - sr.top)
    }
    const ux = pointer.x.on("change", sync)
    const uy = pointer.y.on("change", sync)
    return () => { ux(); uy() }
  }, [pointer.x, pointer.y, rawX, rawY, stageRef])
  return (
    <motion.div
      className="cursor-tag"
      initial={false}
      animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.9 }}
      transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
      style={{ position: "absolute", top: 0, left: 0, x, y, pointerEvents: "none", zIndex: 31, transformOrigin: "0 0" }}
    >
      <span>
        {text}
        <svg viewBox="0 0 14.4 14.4" aria-hidden="true"><path d="M1.2 13.2L13.2 1.2M13.2 1.2H1.2M13.2 1.2V13.2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" fill="none" /></svg>
      </span>
    </motion.div>
  )
}

function Cursor({
  follow = false,
  offset = { x: 0, y: 0 },
  spring: springCfg,
  magnetic,
  variants = {},
  style,
  className,
  children,
}: {
  follow?: boolean
  offset?: { x: number; y: number }
  spring?: { stiffness?: number; damping?: number }
  magnetic?: boolean | { morph?: boolean; snap?: number }
  variants?: Record<string, Record<string, unknown>>
  style?: CSSProperties
  className?: string
  children?: ReactNode
}) {
  const { stageRef, kind, caret, targetBoundingBox, pressed, hovered } = useCursorState()
  const pointer = usePointerPosition()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const baseW = Number(style?.width ?? 16)
  const baseH = Number(style?.height ?? 16)
  const w = useMotionValue(baseW)
  const h = useMotionValue(baseH)
  const opts =
    springCfg ??
    (follow ? { stiffness: 140, damping: 18 } : { stiffness: 900, damping: 55 })
  const x = useSpring(rawX, opts)
  const y = useSpring(rawY, opts)
  const snap = typeof magnetic === "object" ? (magnetic.snap ?? 1) : 1
  const morph = typeof magnetic === "object" ? magnetic.morph !== false : Boolean(magnetic)
  const magneticOn = Boolean(magnetic)

  useEffect(() => {
    const sync = () => {
      const stage = stageRef.current
      if (!stage) return
      const sr = stage.getBoundingClientRect()
      const px = pointer.x.get() - sr.left + offset.x
      const py = pointer.y.get() - sr.top + offset.y
      if (magneticOn && kind === "magnetic" && targetBoundingBox) {
        const tx = targetBoundingBox.left + targetBoundingBox.width / 2 - sr.left
        const ty = targetBoundingBox.top + targetBoundingBox.height / 2 - sr.top
        rawX.set(px + (tx - px) * snap)
        rawY.set(py + (ty - py) * snap)
        if (morph) {
          w.set(targetBoundingBox.width)
          h.set(targetBoundingBox.height)
        } else {
          w.set(baseW)
          h.set(baseH)
        }
        return
      }
      if (kind === "text") {
        rawX.set(px)
        rawY.set(py)
        w.set(2)
        h.set(caret)
        return
      }
      rawX.set(pointer.moved.current ? px : sr.width / 2)
      rawY.set(pointer.moved.current ? py : sr.height / 2)
      w.set(baseW)
      h.set(baseH)
    }

    const stage = stageRef.current
    if (stage) {
      const sr = stage.getBoundingClientRect()
      rawX.set(sr.width / 2)
      rawY.set(sr.height / 2)
    }

    const ux = pointer.x.on("change", sync)
    const uy = pointer.y.on("change", sync)
    return () => {
      ux()
      uy()
    }
  }, [
    baseH,
    baseW,
    caret,
    kind,
    magneticOn,
    morph,
    offset.x,
    offset.y,
    pointer.x,
    pointer.y,
    rawX,
    rawY,
    snap,
    stageRef,
    targetBoundingBox,
    w,
    h,
  ])

  const variantKey =
    pressed && variants.pressed
      ? "pressed"
      : hovered && variants.hover                       // LOCAL: hover expansion
        ? "hover"
      : magneticOn && kind === "magnetic" && variants.magnetic
        ? "magnetic"
        : kind === "text" && variants.text
          ? "text"
          : "default"

  const { width: _ignoredW, height: _ignoredH, ...restStyle } = style ?? {}

  return (
    <motion.div
      className={className}
      data-cursor=""
      initial={false}
      animate={variantKey}
      variants={variants}
      style={{
        ...restStyle,
        position: "absolute",
        top: 0,
        left: 0,
        x,
        y,
        width: w,
        height: h,
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      {children}
    </motion.div>
  )
}


export function CursorMultifollow() {
  return (
    <Stage>
      <Cursor
        className="cursor-dot"
        style={{ backgroundColor: "white", width: 5, height: 5 }}
        variants={{ pressed: { scale: 0.5 }, hover: { scale: 0.7 } }}
      />
      <Cursor
        style={{
          borderRadius: 20,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "#ff0088",
          backgroundColor: "transparent",
          width: 13,
          height: 13,
        }}
        variants={{ pressed: { scale: 0.6, borderColor: "#dd00ee" }, hover: { scale: 2.4 } }}
        spring={{ stiffness: 1000, damping: 50 }}
      />
      <Cursor
        style={{
          borderRadius: 20,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "#dd00ee",
          backgroundColor: "transparent",
          width: 21,
          height: 21,
        }}
        variants={{ pressed: { scale: 0.7, borderColor: "#9911ff" }, hover: { scale: 2.2 } }}
        spring={{ stiffness: 800, damping: 70 }}
      />
      <Cursor
        style={{
          borderRadius: 20,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "#9911ff",
          backgroundColor: "transparent",
          width: 29,
          height: 29,
        }}
        variants={{ pressed: { scale: 0.8, borderColor: "#1e75f7" }, hover: { scale: 2.0 } }}
        spring={{ stiffness: 700, damping: 90 }}
      />
    </Stage>
  )
}

export default CursorMultifollow
