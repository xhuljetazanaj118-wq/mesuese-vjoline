function ViolinSvg({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 720"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g
        stroke="#C4956A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M120 24 C108 24 100 32 100 44 C100 56 108 64 120 64 C132 64 140 56 140 44 C140 32 132 24 120 24 Z" />
        <path d="M120 64 L120 88" />
        <path d="M108 88 L132 88 L128 120 L112 120 Z" />
        <path d="M114 120 L114 200 L126 200 L126 120" />
        <path d="M118 200 L118 320 L122 320 L122 200" strokeWidth="1" />
        <path d="M120 320 C78 318 52 350 50 390 C48 420 62 442 88 448" />
        <path d="M120 320 C162 318 188 350 190 390 C192 420 178 442 152 448" />
        <path d="M88 448 C82 468 82 492 88 512" />
        <path d="M152 448 C158 468 158 492 152 512" />
        <path d="M88 512 C60 530 48 560 52 590 C56 620 84 640 120 642 C156 640 184 620 188 590 C192 560 180 530 152 512" />
        <path d="M98 420 C94 440 94 460 98 478" strokeWidth="1.2" />
        <path d="M94 448 L102 448" strokeWidth="1" />
        <path d="M142 420 C146 440 146 460 142 478" strokeWidth="1.2" />
        <path d="M138 448 L146 448" strokeWidth="1" />
        <path d="M108 500 L132 500" strokeWidth="1" />
        <path d="M114 600 L126 600 L124 630 L116 630 Z" strokeWidth="1" />
        <path d="M116 200 L116 620" strokeWidth="0.5" opacity="0.4" />
        <path d="M120 200 L120 630" strokeWidth="0.5" opacity="0.4" />
        <path d="M124 200 L124 620" strokeWidth="0.5" opacity="0.4" />
        <path d="M168 180 L168 580" strokeWidth="2" />
        <path d="M160 180 C155 175 155 165 162 162 L174 162 C181 165 181 175 176 180" strokeWidth="1.5" />
        <path d="M156 575 C151 580 151 590 158 593 L178 593 C185 590 185 580 180 575" strokeWidth="1.5" />
      </g>
    </svg>
  )
}

export { ViolinSvg }

export default function ViolinBackground({ variant = 'hero' }) {
  if (variant === 'dark') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <ViolinSvg className="absolute -left-20 top-1/2 h-[70vh] w-auto -translate-y-1/2 opacity-[0.08]" />
        <ViolinSvg className="absolute -right-16 bottom-0 h-[50vh] w-auto -rotate-12 opacity-[0.06]" />
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-chocolate via-chocolate/98 to-[#2a1810]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,rgba(196,149,106,0.2),transparent_55%)]" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <ViolinSvg className="absolute -left-24 top-1/2 h-[65vh] w-auto -translate-y-1/2 opacity-[0.05]" />
    </div>
  )
}
