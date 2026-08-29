type InstagramProps = {
  size?: number
  className?: string
}

export default function Instagram({ size = 20, className }: InstagramProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <rect
        height="16"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="2"
        width="16"
        x="4"
        y="4"
      />
      <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" fill="currentColor" r="1.15" />
    </svg>
  )
}
