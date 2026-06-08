/* ============================================================
   jeong0o0 | Security Portfolio — script.js (Optimized)
   ============================================================ */
'use strict'

/* 1. 로딩 스크린 */
;(function initLoader() {
  const loader = document.getElementById('loader')
  if (!loader) return
  document.body.style.overflow = 'hidden'
  setTimeout(() => {
    loader.classList.add('hidden')
    document.body.style.overflow = ''
  }, 1200)
})()

/* 2. 커스텀 커서 (모바일 환경이 아닐 때만 부드럽게 작동) */
;(function initCursor() {
  const dot = document.getElementById('cursor-dot')
  const ring = document.getElementById('cursor-ring')
  if (!dot || !ring || window.innerWidth <= 768) return

  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0
  document.addEventListener(
    'mousemove',
    (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`
    },
    { passive: true },
  )
  ;(function animateRing() {
    rx += (mx - rx) * 0.15
    ry += (my - ry) * 0.15
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
    requestAnimationFrame(animateRing)
  })()

  document.addEventListener(
    'mouseover',
    (e) => {
      if (e.target.closest('a, button')) ring.classList.add('hovered')
      else ring.classList.remove('hovered')
    },
    { passive: true },
  )
})()

/* 3. 타이핑 효과 — 냉장고 프로젝트 라인 추가 */
;(function initTypewriter() {
  const lines = ['Jeong', 'Web Programming', 'Portfolio', 'Website']
  const el = document.createElement('p')
  el.id = 'typewriter'
  const titleEl = document.querySelector('.title-main')
  if (!titleEl) return
  titleEl.insertAdjacentElement('afterend', el)
  let li = 0,
    ci = 0,
    del = false
  function tick() {
    const cur = lines[li]
    if (!del) {
      el.textContent = cur.slice(0, ++ci)
      if (ci === cur.length) {
        del = true
        setTimeout(tick, 1600)
        return
      }
    } else {
      el.textContent = cur.slice(0, --ci)
      if (ci === 0) {
        del = false
        li = (li + 1) % lines.length
      }
    }
    setTimeout(tick, del ? 40 : 80)
  }
  tick()
})()

/* 4. 물결 파문 리플 효과 (클릭 시) */
;(function initRipple() {
  document.addEventListener(
    'click',
    (e) => {
      const r = document.createElement('div')
      r.className = 'ripple'
      const size = 60 + Math.random() * 40
      Object.assign(r.style, {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        width: `${size}px`,
        height: `${size}px`,
      })
      document.body.appendChild(r)
      setTimeout(() => r.remove(), 800)
    },
    { passive: true },
  )
})()

/* 5. 매트릭스 레인 (성능 최적화 버전) */
;(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const FS = 16
  const CHARS = '0123456789ABCDEF'
  let cols, drops

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    cols = Math.floor(canvas.width / FS)
    drops = Array(cols).fill(1)
  }
  resize()

  let resizeTimeout
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(resize, 200)
  })

  setInterval(() => {
    ctx.fillStyle = 'rgba(232,248,252,0.08)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = `${FS}px "Fira Code", monospace`

    for (let i = 0; i < drops.length; i++) {
      const ch = CHARS[Math.floor(Math.random() * CHARS.length)]
      ctx.fillStyle =
        Math.random() > 0.98 ? 'rgba(26,122,138,0.4)' : 'rgba(58,181,200,0.08)'
      ctx.fillText(ch, i * FS, drops[i] * FS)
      if (drops[i] * FS > canvas.height && Math.random() > 0.975) drops[i] = 0
      drops[i]++
    }
  }, 80)
})()

/* 6. 스크롤 진행 바 */
;(function initScrollBar() {
  const bar = document.getElementById('scroll-bar')
  if (!bar) return
  window.addEventListener(
    'scroll',
    () => {
      const ratio =
        window.scrollY / (document.body.scrollHeight - window.innerHeight)
      bar.style.width = `${(ratio * 100).toFixed(2)}%`
    },
    { passive: true },
  )
})()

/* 7. 네비 스크롤 + 액티브 + 모바일 */
;(function initNav() {
  const nav = document.getElementById('main-nav')
  const navLinks = document.querySelectorAll('.nav-links a')
  const sections = document.querySelectorAll('header[id], section[id]')

  window.addEventListener(
    'scroll',
    () => {
      nav.classList.toggle('scrolled', window.scrollY > 40)
    },
    { passive: true },
  )

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        navLinks.forEach((a) =>
          a.classList.toggle(
            'active',
            a.getAttribute('href') === `#${e.target.id}`,
          ),
        )
      })
    },
    { rootMargin: '-40% 0px -55% 0px' },
  )

  sections.forEach((s) => io.observe(s))

  const toggle = document.getElementById('nav-toggle')
  const drawer = document.getElementById('nav-drawer')
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = drawer.classList.toggle('open')
      toggle.classList.toggle('open', open)
    })
    drawer.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        drawer.classList.remove('open')
        toggle.classList.remove('open')
      }),
    )
  }
})()

/* 8. 섹션 페이드인 (스크롤 최적화) */
;(function initFadeIn() {
  const targets = document.querySelectorAll(
    '.project-card, .section-title, .profile-links, .hero-badge',
  )
  targets.forEach((el, i) => {
    el.classList.add('fade-target')
    if (el.classList.contains('project-card'))
      el.style.transitionDelay = `${(i % 2) * 0.05}s`
  })

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('fade-in')
        io.unobserve(e.target)
      })
    },
    { threshold: 0.05 },
  )
  targets.forEach((el) => io.observe(el))
})()

/* 9. 마우스 파티클 스파크 (성능 스로틀링 적용) */
;(function initParticles() {
  let last = 0
  document.addEventListener(
    'mousemove',
    (e) => {
      const now = Date.now()
      if (now - last < 70) return
      last = now

      const p = document.createElement('span')
      p.className = 'spark'
      const size = Math.random() * 4 + 2
      const dx = (Math.random() - 0.5) * 60,
        dy = (Math.random() - 0.5) * 60

      Object.assign(p.style, {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        width: `${size}px`,
        height: `${size}px`,
        '--dx': `${dx}px`,
        '--dy': `${dy}px`,
      })
      document.body.appendChild(p)
      setTimeout(() => p.remove(), 600)
    },
    { passive: true },
  )
})()

/* 12. 부드러운 앵커 스크롤 */
;(function initSmoothScroll() {
  const NAV_H =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
    ) || 68
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1)
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - NAV_H,
        behavior: 'smooth',
      })
    })
  })
})()

/* 13. 카드 3D 틸트 (transform 최적화) */
;(function initTilt() {
  const cards = document.querySelectorAll('.project-card')
  const MAX = 5
  cards.forEach((card) => {
    card.addEventListener(
      'mousemove',
      (e) => {
        const { left, top, width, height } = card.getBoundingClientRect()
        const x = (e.clientX - left) / width - 0.5,
          y = (e.clientY - top) / height - 0.5
        card.style.transform = `translate3d(0, -4px, 0) rotateX(${(-y * MAX).toFixed(1)}deg) rotateY(${(x * MAX).toFixed(1)}deg)`
      },
      { passive: true },
    )
    card.addEventListener(
      'mouseleave',
      () => {
        card.style.transform = ''
      },
      { passive: true },
    )
  })
})()

/* 14. 텍스트 스크램블 효과 — T2 카드 h4도 포함되도록 querySelectorAll 유지 */
;(function initScramble() {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  document.querySelectorAll('.project-card h4').forEach((el) => {
    const original = el.textContent
    let interval = null
    el.addEventListener(
      'mouseenter',
      () => {
        clearInterval(interval)
        let iteration = 0
        interval = setInterval(() => {
          el.textContent = original
            .split('')
            .map((ch, i) => {
              if (ch === ' ') return ' '
              if (i < iteration) return original[i]
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
          iteration += 0.5
          if (iteration >= original.length) {
            clearInterval(interval)
            el.textContent = original
          }
        }, 30)
      },
      { passive: true },
    )
    el.addEventListener(
      'mouseleave',
      () => {
        clearInterval(interval)
        el.textContent = original
      },
      { passive: true },
    )
  })
})()
