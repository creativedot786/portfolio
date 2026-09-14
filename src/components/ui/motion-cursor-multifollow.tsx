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

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [x, y])

  return { x, y }
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

  useEffect(() => {
    const down = () => setPressed(true)
    const up = () => setPressed(false)
    const over = (e: PointerEvent) => {
      const el = e.target as Element | null
      setHovered(Boolean(el?.closest?.(INTERACTIVE)))
      setInverted(Boolean(el?.closest?.("[data-cursor-invert]")))
    }
    const leave = () => { setPressed(false); setHovered(false); setInverted(false) }
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

  return { pressed, hovered, inverted }
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
  const { pressed, hovered, inverted } = useWindowPointer()   // LOCAL: was local state on this div

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
      </div>
    </CursorCtx.Provider>
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
      rawX.set(pointer.x.get() ? px : sr.width / 2)
      rawY.set(pointer.y.get() ? py : sr.height / 2)
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
