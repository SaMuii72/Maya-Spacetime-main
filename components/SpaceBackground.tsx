"use client"

import { useEffect, useRef, useCallback } from "react"

// ============================================================================
// DEEP COSMIC SPACE BACKGROUND - ULTRA-DENSE FANTASY NEBULA
// Single self-contained TSX file. No central focal objects.
// Extremely dense starfield with golden accents, rich teal-cyan nebula clouds,
// purple/magenta patches, warm glowing highlights, mystical fantasy atmosphere.
// ============================================================================

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function seededRng(seed: number) {
  return () => {
    seed = (seed * 16807 + 0) % 2147483647
    return (seed - 1) / 2147483646
  }
}

// -- Perlin 2D noise --
function createNoise(seed?: number) {
  const rng = seed !== undefined ? seededRng(seed) : Math.random
  const perm = new Uint8Array(512)
  for (let i = 0; i < 256; i++) perm[i] = i
  for (let i = 255; i > 0; i--) {
    const j = (rng() * (i + 1)) | 0
    ;[perm[i], perm[j]] = [perm[j], perm[i]]
  }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i]

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
  const lerp = (a: number, b: number, t: number) => a + t * (b - a)
  const grad = (h: number, x: number, y: number) => {
    const k = h & 3
    return (
      ((k & 1) === 0 ? (k < 2 ? x : y) : -(k < 2 ? x : y)) +
      ((k & 2) === 0 ? (k < 2 ? y : x) : -(k < 2 ? y : x))
    )
  }

  return (x: number, y: number) => {
    const X = Math.floor(x) & 255,
      Y = Math.floor(y) & 255
    const xf = x - Math.floor(x),
      yf = y - Math.floor(y)
    const u = fade(xf),
      v = fade(yf)
    return lerp(
      lerp(grad(perm[perm[X] + Y], xf, yf), grad(perm[perm[X + 1] + Y], xf - 1, yf), u),
      lerp(
        grad(perm[perm[X] + Y + 1], xf, yf - 1),
        grad(perm[perm[X + 1] + Y + 1], xf - 1, yf - 1),
        u
      ),
      v
    )
  }
}

function fbm(noise: (x: number, y: number) => number, x: number, y: number, octaves: number) {
  let val = 0, amp = 0.5, freq = 1
  for (let i = 0; i < octaves; i++) {
    val += amp * noise(x * freq, y * freq)
    amp *= 0.48
    freq *= 2.12
  }
  return val
}

function turbulence(noise: (x: number, y: number) => number, x: number, y: number, octaves: number) {
  let val = 0, amp = 0.5, freq = 1
  for (let i = 0; i < octaves; i++) {
    val += amp * Math.abs(noise(x * freq, y * freq))
    amp *= 0.5
    freq *= 2.0
  }
  return val
}

// -- Star definition --
interface Star {
  x: number; y: number; r: number
  baseAlpha: number; twinkleSpd: number; twinkleOff: number
  cr: number; cg: number; cb: number
  hasCross: boolean; crossLen: number
  isGolden: boolean
}

const STAR_COLORS = [
  { r: 195, g: 215, b: 255, w: 24 },
  { r: 215, g: 230, b: 255, w: 20 },
  { r: 240, g: 245, b: 255, w: 16 },
  { r: 170, g: 200, b: 245, w: 10 },
  { r: 140, g: 180, b: 235, w: 7 },
  { r: 110, g: 160, b: 230, w: 4 },
  { r: 255, g: 220, b: 100, w: 6 },  // golden
  { r: 255, g: 200, b: 80, w: 4 },   // deep gold
  { r: 255, g: 180, b: 60, w: 3 },   // amber
  { r: 255, g: 150, b: 90, w: 2 },   // warm orange
  { r: 255, g: 120, b: 80, w: 1 },   // reddish
  { r: 180, g: 140, b: 255, w: 1.5 }, // purple hint (rare)
]

function pickStarColor() {
  const total = STAR_COLORS.reduce((s, c) => s + c.w, 0)
  let r = Math.random() * total
  for (const c of STAR_COLORS) {
    r -= c.w
    if (r <= 0) return c
  }
  return STAR_COLORS[0]
}

function makeStars(w: number, h: number, count: number): Star[] {
  const stars: Star[] = []
  const cx = w * 0.5, cy = h * 0.45
  const maxDist = Math.sqrt(cx * cx + cy * cy)

  for (let i = 0; i < count; i++) {
    let x: number, y: number

    const distType = Math.random()
    if (distType < 0.30) {
      // Dense center cluster
      const angle = rand(0, Math.PI * 2)
      const dist = Math.pow(Math.random(), 0.5) * maxDist * 0.45
      x = cx + Math.cos(angle) * dist
      y = cy + Math.sin(angle) * dist
    } else if (distType < 0.50) {
      // Medium cluster
      const angle = rand(0, Math.PI * 2)
      const dist = Math.pow(Math.random(), 0.7) * maxDist * 0.7
      x = cx + Math.cos(angle) * dist
      y = cy + Math.sin(angle) * dist
    } else {
      // Uniform fill
      x = rand(-20, w + 20)
      y = rand(-20, h + 20)
    }

    const tier = Math.random()
    const isBright = tier < 0.015
    const isMed = tier < 0.08
    const isSmallBright = tier < 0.18
    const col = pickStarColor()
    const isGolden = col.r > 200 && col.g > 140 && col.b < 120

    let r: number
    if (isBright) r = rand(1.2, 2.4)
    else if (isMed) r = rand(0.6, 1.2)
    else if (isSmallBright) r = rand(0.3, 0.6)
    else r = rand(0.08, 0.35)

    stars.push({
      x, y, r,
      baseAlpha: isBright ? rand(0.85, 1) : isMed ? rand(0.4, 0.8) : isSmallBright ? rand(0.15, 0.45) : rand(0.04, 0.2),
      twinkleSpd: rand(0.3, 3.0),
      twinkleOff: rand(0, Math.PI * 2),
      cr: col.r, cg: col.g, cb: col.b,
      hasCross: (isBright && Math.random() < 0.7) || (isGolden && isMed && Math.random() < 0.3),
      crossLen: isBright ? rand(6, 14) : rand(3, 7),
      isGolden,
    })
  }
  return stars
}

// -- Shooting star --
interface Meteor {
  x: number; y: number; vx: number; vy: number
  len: number; alpha: number; decay: number; active: boolean
}

function spawnMeteor(w: number, h: number): Meteor {
  const x = rand(w * 0.05, w * 0.95)
  const y = rand(-30, h * 0.15)
  const angle = rand(Math.PI * 0.55, Math.PI * 0.78)
  const spd = rand(7, 14)
  return {
    x, y,
    vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd,
    len: rand(80, 200), alpha: 1, decay: rand(0.004, 0.01), active: true,
  }
}

// -- Nebula baking: Rich teal-cyan with purple/magenta patches --
function bakeNebula(w: number, h: number): HTMLCanvasElement {
  const n1 = createNoise(42)
  const n2 = createNoise(137)
  const n3 = createNoise(256)
  const n4 = createNoise(999)
  const n5 = createNoise(555) // purple layer

  const scale = 2
  const cw = Math.ceil(w / scale), ch = Math.ceil(h / scale)
  const off = document.createElement("canvas")
  off.width = cw; off.height = ch
  const ctx = off.getContext("2d")!
  const img = ctx.createImageData(cw, ch)
  const d = img.data

  for (let py = 0; py < ch; py++) {
    for (let px = 0; px < cw; px++) {
      const sx = px / cw, sy = py / ch

      const v1 = (fbm(n1, sx * 3.5, sy * 3.5, 8) + 1) * 0.5
      const v2 = (fbm(n2, sx * 6 + 10, sy * 6 + 10, 7) + 1) * 0.5
      const v3 = turbulence(n3, sx * 9, sy * 9, 6) * 0.7
      const v4 = (fbm(n4, sx * 14 + 30, sy * 14 + 30, 5) + 1) * 0.5
      const v5 = (fbm(n5, sx * 4.5 + 20, sy * 4.5 + 20, 7) + 1) * 0.5

      // Main cloud density - richer
      const cloud = Math.pow(v1, 1.3) * 0.40 + Math.pow(v2, 1.6) * 0.28 + v3 * 0.18 + Math.pow(v4, 2.2) * 0.14

      // Spatial regions -- more nebula patches for richer coverage
      const d1 = Math.sqrt(Math.pow(sx - 0.52, 2) * 1.2 + Math.pow(sy - 0.40, 2))
      const d2 = Math.sqrt(Math.pow(sx - 0.15, 2) + Math.pow(sy - 0.50, 2) * 1.1)
      const d3 = Math.sqrt(Math.pow(sx - 0.80, 2) * 1.3 + Math.pow(sy - 0.25, 2))
      const d4 = Math.sqrt(Math.pow(sx - 0.40, 2) + Math.pow(sy - 0.78, 2) * 1.3)
      const d5 = Math.sqrt(Math.pow(sx - 0.70, 2) + Math.pow(sy - 0.65, 2))
      const d6 = Math.sqrt(Math.pow(sx - 0.25, 2) + Math.pow(sy - 0.20, 2))

      const mask = Math.max(
        Math.exp(-d1 * d1 * 2.2) * 1.0,
        Math.exp(-d2 * d2 * 2.8) * 0.85,
        Math.exp(-d3 * d3 * 3.5) * 0.65,
        Math.exp(-d4 * d4 * 3.5) * 0.55,
        Math.exp(-d5 * d5 * 4.0) * 0.50,
        Math.exp(-d6 * d6 * 4.5) * 0.45,
        0.08 // subtle base everywhere
      )

      const fd = cloud * mask

      // Purple/magenta influence zone
      const purpleZone = Math.exp(-d3 * d3 * 3) * v5 * 0.5 + Math.exp(-d5 * d5 * 4) * v5 * 0.35
      // Warm golden highlight zone
      const warmZone = Math.exp(-d1 * d1 * 6) * v2 * 0.35 + Math.exp(-d4 * d4 * 8) * v1 * 0.2
      // Teal boost zone
      const tealZone = Math.exp(-d2 * d2 * 3) * v1 * 0.6 + Math.exp(-d6 * d6 * 3.5) * v2 * 0.4

      // Color mixing: rich teal base + purple patches + warm accents
      const baseR = 10 + warmZone * 110 + purpleZone * 80
      const baseG = 45 + v1 * 50 + tealZone * 60 + purpleZone * 15
      const baseB = 85 + v1 * 70 + tealZone * 45 + purpleZone * 70

      const r = Math.floor(baseR * fd * 3.0)
      const g = Math.floor(baseG * fd * 3.0)
      const b = Math.floor(baseB * fd * 3.0)
      const a = Math.floor(Math.min(fd * 300, 180))

      const idx = (py * cw + px) * 4
      d[idx] = Math.min(r, 255)
      d[idx + 1] = Math.min(g, 255)
      d[idx + 2] = Math.min(b, 255)
      d[idx + 3] = a
    }
  }

  ctx.putImageData(img, 0, 0)
  return off
}

// Second drifting nebula layer
function bakeNebulaLayer2(w: number, h: number): HTMLCanvasElement {
  const n1 = createNoise(777)
  const n2 = createNoise(888)
  const n3 = createNoise(444) // purple channel

  const scale = 3
  const cw = Math.ceil(w / scale), ch = Math.ceil(h / scale)
  const off = document.createElement("canvas")
  off.width = cw; off.height = ch
  const ctx = off.getContext("2d")!
  const img = ctx.createImageData(cw, ch)
  const d = img.data

  for (let py = 0; py < ch; py++) {
    for (let px = 0; px < cw; px++) {
      const sx = px / cw, sy = py / ch
      const v1 = (fbm(n1, sx * 4.5 + 50, sy * 4.5 + 50, 7) + 1) * 0.5
      const v2 = turbulence(n2, sx * 7 + 80, sy * 7 + 80, 5) * 0.6
      const v3 = (fbm(n3, sx * 3 + 15, sy * 3 + 15, 6) + 1) * 0.5
      const density = Math.pow(v1, 1.5) * 0.55 + v2 * 0.35 + Math.pow(v3, 2) * 0.1

      const d1x = Math.sqrt(Math.pow(sx - 0.35, 2) + Math.pow(sy - 0.32, 2))
      const d2x = Math.sqrt(Math.pow(sx - 0.72, 2) + Math.pow(sy - 0.55, 2))
      const d3x = Math.sqrt(Math.pow(sx - 0.55, 2) + Math.pow(sy - 0.70, 2))
      const mask = Math.max(
        Math.exp(-d1x * d1x * 3) * 0.8,
        Math.exp(-d2x * d2x * 3) * 0.65,
        Math.exp(-d3x * d3x * 4) * 0.45,
        0.03
      )

      const fd = density * mask
      const purpleMix = v3 * 0.4
      const r = Math.floor((12 + v2 * 25 + purpleMix * 55) * fd * 2.5)
      const g = Math.floor((28 + v1 * 35 + purpleMix * 8) * fd * 2.5)
      const b = Math.floor((65 + v1 * 55 + purpleMix * 45) * fd * 2.5)
      const a = Math.floor(Math.min(fd * 220, 110))

      const idx = (py * cw + px) * 4
      d[idx] = Math.min(r, 255)
      d[idx + 1] = Math.min(g, 255)
      d[idx + 2] = Math.min(b, 255)
      d[idx + 3] = a
    }
  }

  ctx.putImageData(img, 0, 0)
  return off
}

// Warm core glow
function bakeGalacticCore(w: number, h: number): HTMLCanvasElement {
  const n1 = createNoise(333)
  const scale = 2
  const cw = Math.ceil(w / scale), ch = Math.ceil(h / scale)
  const off = document.createElement("canvas")
  off.width = cw; off.height = ch
  const ctx = off.getContext("2d")!
  const img = ctx.createImageData(cw, ch)
  const d = img.data

  for (let py = 0; py < ch; py++) {
    for (let px = 0; px < cw; px++) {
      const sx = px / cw, sy = py / ch
      const v = (fbm(n1, sx * 7, sy * 7, 6) + 1) * 0.5
      const dx = sx - 0.5, dy = sy - 0.43
      const dist = Math.sqrt(dx * dx * 1.6 + dy * dy * 2.0)
      const core = Math.exp(-dist * dist * 10) * Math.pow(v, 1.0)

      const r = Math.floor(core * 200)
      const g = Math.floor(core * 140)
      const b = Math.floor(core * 90)
      const a = Math.floor(Math.min(core * 220, 120))

      const idx = (py * cw + px) * 4
      d[idx] = Math.min(r, 255)
      d[idx + 1] = Math.min(g, 255)
      d[idx + 2] = Math.min(b, 255)
      d[idx + 3] = a
    }
  }

  ctx.putImageData(img, 0, 0)
  return off
}

// Film grain texture
function bakeGrain(w: number, h: number): HTMLCanvasElement {
  const off = document.createElement("canvas")
  const s = 2
  off.width = Math.ceil(w / s); off.height = Math.ceil(h / s)
  const ctx = off.getContext("2d")!
  const img = ctx.createImageData(off.width, off.height)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const v = Math.random() * 18
    d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = 14
  }
  ctx.putImageData(img, 0, 0)
  return off
}

// Dust particles
interface Dust {
  x: number; y: number; vx: number; vy: number
  r: number; alpha: number; cr: number; cg: number; cb: number
}

function makeDust(w: number, h: number, count: number): Dust[] {
  const dust: Dust[] = []
  for (let i = 0; i < count; i++) {
    const type = Math.random()
    const isTeal = type < 0.45
    const isGold = type < 0.70
    dust.push({
      x: rand(0, w), y: rand(0, h),
      vx: rand(-0.06, 0.06), vy: rand(-0.05, 0.05),
      r: rand(0.2, 0.7),
      alpha: rand(0.04, 0.18),
      cr: isTeal ? Math.floor(rand(60, 130)) : isGold ? Math.floor(rand(220, 255)) : Math.floor(rand(160, 200)),
      cg: isTeal ? Math.floor(rand(150, 210)) : isGold ? Math.floor(rand(180, 220)) : Math.floor(rand(130, 170)),
      cb: isTeal ? Math.floor(rand(200, 255)) : isGold ? Math.floor(rand(50, 100)) : Math.floor(rand(200, 245)),
    })
  }
  return dust
}

// ============================================================================
// COMPONENT
// ============================================================================
function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  const init = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    let w = window.innerWidth, h = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      w = window.innerWidth; h = window.innerHeight
      canvas!.width = w * dpr; canvas!.height = h * dpr
      canvas!.style.width = w + "px"; canvas!.style.height = h + "px"
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // Ultra-dense starfield: ~15000 stars
    const starCount = Math.min(Math.floor((w * h) / 80), 15000)
    let stars = makeStars(w, h, starCount)
    let dust = makeDust(w, h, 180)

    // Bake textures
    const nebTex1 = bakeNebula(w, h)
    const nebTex2 = bakeNebulaLayer2(w, h)
    const coreTex = bakeGalacticCore(w, h)
    let grainTex = bakeGrain(w, h)

    let meteors: Meteor[] = []
    let lastMeteorT = 0
    let time = 0
    let neb2OffX = 0, neb2OffY = 0

    // -- Draw functions --

    function drawBase() {
      const g = ctx!.createRadialGradient(w * 0.5, h * 0.43, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.85)
      g.addColorStop(0, "#0e2038")
      g.addColorStop(0.15, "#0a1a2e")
      g.addColorStop(0.35, "#071424")
      g.addColorStop(0.55, "#050f1b")
      g.addColorStop(0.75, "#040b14")
      g.addColorStop(1, "#030810")
      ctx!.fillStyle = g
      ctx!.fillRect(0, 0, w, h)
    }

    function drawNebulae() {
      ctx!.globalAlpha = 0.92
      ctx!.drawImage(nebTex1, 0, 0, w, h)

      neb2OffX += 0.015; neb2OffY += 0.008
      const pulse = Math.sin(time * 0.05) * 0.12 + 0.55
      ctx!.globalAlpha = pulse
      ctx!.drawImage(nebTex2, neb2OffX, neb2OffY, w, h)
      ctx!.globalAlpha = 1
    }

    function drawGalacticCore() {
      const pulse = Math.sin(time * 0.035) * 0.08 + 0.3
      ctx!.globalAlpha = pulse
      ctx!.globalCompositeOperation = "screen"
      ctx!.drawImage(coreTex, 0, 0, w, h)
      ctx!.globalCompositeOperation = "source-over"
      ctx!.globalAlpha = 1
    }

    function drawAmbientGlows() {
      const glows = [
        { x: w * 0.50, y: h * 0.40, rx: w * 0.35, ry: h * 0.28, cr: 18, cg: 55, cb: 95, a: 0.06 },
        { x: w * 0.15, y: h * 0.52, rx: w * 0.28, ry: h * 0.24, cr: 12, cg: 60, cb: 90, a: 0.045 },
        { x: w * 0.80, y: h * 0.28, rx: w * 0.22, ry: h * 0.18, cr: 40, cg: 25, cb: 70, a: 0.035 },
        { x: w * 0.42, y: h * 0.75, rx: w * 0.22, ry: h * 0.17, cr: 16, cg: 48, cb: 78, a: 0.03 },
        { x: w * 0.70, y: h * 0.62, rx: w * 0.18, ry: h * 0.15, cr: 35, cg: 20, cb: 60, a: 0.025 },
      ]
      for (const gl of glows) {
        const p = Math.sin(time * 0.07 + gl.x * 0.002) * 0.2 + 0.8
        ctx!.globalAlpha = gl.a * p
        const gr = ctx!.createRadialGradient(gl.x, gl.y, 0, gl.x, gl.y, Math.max(gl.rx, gl.ry))
        gr.addColorStop(0, `rgba(${gl.cr},${gl.cg},${gl.cb},0.5)`)
        gr.addColorStop(0.35, `rgba(${gl.cr},${gl.cg},${gl.cb},0.2)`)
        gr.addColorStop(1, `rgba(${gl.cr},${gl.cg},${gl.cb},0)`)
        ctx!.fillStyle = gr
        ctx!.beginPath()
        ctx!.ellipse(gl.x, gl.y, gl.rx, gl.ry, 0, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1
    }

    function drawStars() {
      for (const s of stars) {
        const tw =
          Math.sin(time * s.twinkleSpd + s.twinkleOff) * 0.28 +
          Math.sin(time * s.twinkleSpd * 0.53 + s.twinkleOff * 1.7) * 0.14 +
          Math.sin(time * s.twinkleSpd * 1.9 + s.twinkleOff * 0.4) * 0.08 +
          0.50
        const a = s.baseAlpha * tw
        if (a < 0.015) continue

        ctx!.globalAlpha = Math.min(a, 1)

        // Glow for bright stars
        if (s.r > 0.8) {
          const glowR = s.r * (s.isGolden ? 6 : 4.5)
          const gr = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR)
          gr.addColorStop(0, `rgba(${s.cr},${s.cg},${s.cb},0.6)`)
          gr.addColorStop(0.2, `rgba(${s.cr},${s.cg},${s.cb},0.18)`)
          gr.addColorStop(0.5, `rgba(${s.cr},${s.cg},${s.cb},0.04)`)
          gr.addColorStop(1, `rgba(${s.cr},${s.cg},${s.cb},0)`)
          ctx!.fillStyle = gr
          ctx!.beginPath()
          ctx!.arc(s.x, s.y, glowR, 0, Math.PI * 2)
          ctx!.fill()
        }

        // Diffraction cross for bright/golden stars
        if (s.hasCross) {
          const crossAlpha = s.isGolden ? a * 0.55 : a * 0.3
          ctx!.globalAlpha = Math.min(crossAlpha, 0.5)
          ctx!.strokeStyle = `rgba(${s.cr},${s.cg},${s.cb},0.6)`
          ctx!.lineWidth = s.isGolden ? 0.8 : 0.5
          const len = s.crossLen
          // Horizontal
          ctx!.beginPath()
          ctx!.moveTo(s.x - len, s.y)
          ctx!.lineTo(s.x + len, s.y)
          ctx!.stroke()
          // Vertical
          ctx!.beginPath()
          ctx!.moveTo(s.x, s.y - len)
          ctx!.lineTo(s.x, s.y + len)
          ctx!.stroke()
          // Diagonal for golden stars (4-point star effect)
          if (s.isGolden && s.r > 1.0) {
            ctx!.lineWidth = 0.4
            const dLen = len * 0.6
            ctx!.beginPath()
            ctx!.moveTo(s.x - dLen, s.y - dLen)
            ctx!.lineTo(s.x + dLen, s.y + dLen)
            ctx!.stroke()
            ctx!.beginPath()
            ctx!.moveTo(s.x + dLen, s.y - dLen)
            ctx!.lineTo(s.x - dLen, s.y + dLen)
            ctx!.stroke()
          }
          ctx!.globalAlpha = Math.min(a, 1)
        }

        // Star core
        ctx!.fillStyle = `rgb(${s.cr},${s.cg},${s.cb})`
        ctx!.beginPath()
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1
    }

    function drawDust() {
      for (const p of dust) {
        p.x += p.vx + Math.sin(time * 0.18 + p.y * 0.004) * 0.015
        p.y += p.vy + Math.cos(time * 0.14 + p.x * 0.004) * 0.012
        if (p.x < -15) p.x = w + 15
        if (p.x > w + 15) p.x = -15
        if (p.y < -15) p.y = h + 15
        if (p.y > h + 15) p.y = -15

        const tw = Math.sin(time * 0.7 + p.x * 0.01) * 0.3 + 0.7
        ctx!.globalAlpha = p.alpha * tw
        ctx!.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},1)`
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1
    }

    function drawMeteors() {
      for (const m of meteors) {
        if (!m.active) continue
        m.x += m.vx; m.y += m.vy
        m.alpha -= m.decay
        if (m.alpha <= 0 || m.x < -300 || m.x > w + 300 || m.y > h + 300) { m.active = false; continue }
        const mag = Math.sqrt(m.vx ** 2 + m.vy ** 2)
        const tx = m.x - m.vx * (m.len / mag)
        const ty = m.y - m.vy * (m.len / mag)

        const gr = ctx!.createLinearGradient(tx, ty, m.x, m.y)
        gr.addColorStop(0, "rgba(255,255,255,0)")
        gr.addColorStop(0.4, `rgba(180,210,240,${m.alpha * 0.2})`)
        gr.addColorStop(0.8, `rgba(220,240,255,${m.alpha * 0.55})`)
        gr.addColorStop(1, `rgba(255,255,255,${m.alpha * 0.85})`)
        ctx!.strokeStyle = gr
        ctx!.lineWidth = 1.2
        ctx!.beginPath()
        ctx!.moveTo(tx, ty)
        ctx!.lineTo(m.x, m.y)
        ctx!.stroke()

        ctx!.globalAlpha = m.alpha * 0.6
        const hg = ctx!.createRadialGradient(m.x, m.y, 0, m.x, m.y, 3)
        hg.addColorStop(0, "rgba(255,255,255,0.8)")
        hg.addColorStop(1, "rgba(200,220,255,0)")
        ctx!.fillStyle = hg
        ctx!.beginPath()
        ctx!.arc(m.x, m.y, 3, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.globalAlpha = 1
      }
      meteors = meteors.filter((m) => m.active)
    }

    function drawVignette() {
      const gr = ctx!.createRadialGradient(w * 0.5, h * 0.5, w * 0.15, w * 0.5, h * 0.5, Math.max(w, h) * 0.72)
      gr.addColorStop(0, "rgba(0,0,0,0)")
      gr.addColorStop(0.3, "rgba(0,0,0,0.02)")
      gr.addColorStop(0.55, "rgba(0,0,0,0.15)")
      gr.addColorStop(0.75, "rgba(0,0,0,0.38)")
      gr.addColorStop(1, "rgba(0,0,0,0.65)")
      ctx!.fillStyle = gr
      ctx!.fillRect(0, 0, w, h)
    }

    function drawGrain() {
      ctx!.globalAlpha = 0.25
      ctx!.drawImage(grainTex, 0, 0, w, h)
      ctx!.globalAlpha = 1
    }

    // -- Animation loop --
    function frame() {
      time += 0.016
      if (time - lastMeteorT > rand(4, 10)) {
        meteors.push(spawnMeteor(w, h))
        lastMeteorT = time
      }

      drawBase()
      drawNebulae()
      drawGalacticCore()
      drawAmbientGlows()
      drawDust()
      drawStars()
      drawMeteors()
      drawVignette()
      drawGrain()

      animRef.current = requestAnimationFrame(frame)
    }

    animRef.current = requestAnimationFrame(frame)

    function onResize() {
      resize()
      stars = makeStars(w, h, Math.min(Math.floor((w * h) / 80), 15000))
      dust = makeDust(w, h, 180)
      grainTex = bakeGrain(w, h)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  useEffect(() => {
    const cleanup = init()
    return cleanup
  }, [init])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        display: "block",
        background: "#030810",
      }}
      aria-hidden="true"
    />
  )
}

// ============================================================================
// PAGE
// ============================================================================
export default function Page() {
  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <SpaceBackground />
    </main>
  )
}
