"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { previews, type Preview } from "@/data/previews"

// Adapted from 21st.dev @minhxthanh/hover-preview.
//
// Two changes were needed for this site:
//  1. Upstream wraps each word in a React <HoverLink>. Our copy is server-rendered Astro HTML,
//     so this attaches delegated listeners to any [data-preview] element instead. The trigger
//     markup stays in the content layer and nothing needs to become React.
//  2. Upstream preloads every image on mount. Here they are fetched when the browser goes idle,
//     so the page's own load is never competing with them.
//
// The card geometry, easing, positioning maths and boundary logic are upstream's.

const CARD_W = 300
const CARD_H = 250
const OFFSET_Y = 20

export function HoverPreview() {
  const [active, setActive] = useState<{ key: string; data: Preview } | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [failed, setFailed] = useState<Record<string, boolean>>({})
  const cardRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    let x = clientX - CARD_W / 2
    let y = clientY - CARD_H - OFFSET_Y

    if (x + CARD_W > window.innerWidth - 20) x = window.innerWidth - CARD_W - 20
    if (x < 20) x = 20
    if (y < 20) y = clientY + OFFSET_Y

    setPosition({ x, y })
  }, [])

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return

    const onEnter = (e: Event) => {
      const el = (e.target as Element)?.closest?.("[data-preview]") as HTMLElement | null
      if (!el) return
      const key = el.dataset.preview!
      const data = previews[key]
      if (!data || failed[key]) return
      const r = el.getBoundingClientRect()
      setActive({ key, data })
      setIsVisible(true)
      updatePosition(r.left + r.width / 2, r.top)
    }
    const onMove = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.("[data-preview]")
      if (el) updatePosition(e.clientX, e.clientY)
    }
    const onLeave = (e: Event) => {
      if ((e.target as Element)?.closest?.("[data-preview]")) setIsVisible(false)
    }

    document.addEventListener("mouseover", onEnter)
    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseout", onLeave)
    document.addEventListener("focusin", onEnter)
    document.addEventListener("focusout", onLeave)
    return () => {
      document.removeEventListener("mouseover", onEnter)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseout", onLeave)
      document.removeEventListener("focusin", onEnter)
      document.removeEventListener("focusout", onLeave)
    }
  }, [updatePosition, failed])

  // Warm the images once the browser is otherwise idle.
  useEffect(() => {
    const warm = () => {
      Object.values(previews).forEach((p) => {
        const img = new Image()
        img.src = p.image
      })
    }
    const w = window as unknown as { requestIdleCallback?: (cb: () => void) => number }
    if (w.requestIdleCallback) w.requestIdleCallback(warm)
    else setTimeout(warm, 2000)
  }, [])

  if (!active) return null

  return (
    <div
      ref={cardRef}
      aria-hidden="true"
      className={`fixed z-[150] pointer-events-none will-change-[transform,opacity] transition-[opacity,transform] duration-250 ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2.5 scale-95"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className="rounded-2xl bg-surface-raised p-1 overflow-hidden shadow-[0_25px_50px_-12px_color-mix(in_srgb,var(--color-page)_80%,transparent),0_0_0_1px_var(--color-line)]">
        <img
          src={active.data.image}
          alt=""
          width={280}
          className="w-[280px] h-auto rounded-[10px] block bg-surface"
          onError={() => {
            setIsVisible(false)
            setFailed((f) => ({ ...f, [active.key]: true }))
          }}
        />
        <div className="px-1 pt-1.5 pb-1 text-meta font-semibold text-primary">{active.data.title}</div>
        <div className="px-1 pb-1 text-meta text-tertiary">{active.data.subtitle}</div>
      </div>
    </div>
  )
}

export default HoverPreview
