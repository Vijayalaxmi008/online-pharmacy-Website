const Logo = ({ size = 'normal', theme = 'light' }) => {
  const sizes = { small: 'w-10 h-10', normal: 'w-12 h-12', large: 'w-16 h-16' }

  // theme "light" = for use on white/light backgrounds (header)
  // theme "dark"  = for use on the navy footer background
  const primary = theme === 'dark' ? '#2dd4bf' : '#0b1f66'   // top + left lobes
  const secondary = theme === 'dark' ? '#ffffff' : '#2dd4bf' // right + bottom lobes

  return (
    <div className={`${sizes[size]} flex items-center justify-center shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
        <defs>
          <mask id={`crescent-${theme}`}>
            <rect width="100" height="100" fill="black" />
            <circle cx="44" cy="20" r="9" fill="white" />
            <circle cx="49" cy="17" r="8" fill="black" />
          </mask>
        </defs>

        {/* right + bottom lobes */}
        <circle cx="72" cy="50" r="24" fill={secondary} />
        <circle cx="50" cy="72" r="24" fill={secondary} />

        {/* top + left lobes */}
        <circle cx="50" cy="28" r="24" fill={primary} />
        <circle cx="28" cy="50" r="24" fill={primary} />

        {/* shine / crescent highlight */}
        <circle cx="44" cy="20" r="9" fill="#ffffff" opacity="0.85" mask={`url(#crescent-${theme})`} />
      </svg>
    </div>
  )
}
export default Logo
