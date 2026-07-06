interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({ label, title, subtitle, align = 'left', light = false }: SectionHeadingProps) {
  const isCentered = align === 'center'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCentered ? 'center' : 'flex-start',
        textAlign: isCentered ? 'center' : 'left',
        marginBottom: '40px',
      }}
    >
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#7C3AED',
            marginBottom: '12px',
          }}
        >
          {label}
        </span>
      )}
      <h2
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(2.25rem, 4vw + 1rem, 3.75rem)',
          lineHeight: 1.05,
          letterSpacing: '0.02em',
          color: light ? '#F8FAFC' : '#F8FAFC',
          margin: 0,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: '60px',
          height: '2px',
          marginTop: '18px',
          background: 'linear-gradient(90deg, #7C3AED 0%, #00E5FF 100%)',
        }}
      />
      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '16px',
            color: '#CBD5E1',
            marginTop: '18px',
            maxWidth: '560px',
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
