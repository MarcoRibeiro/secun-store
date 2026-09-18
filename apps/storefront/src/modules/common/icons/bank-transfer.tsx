type BankTransferProps = {
  size?: number
  className?: string
}

export default function BankTransfer({
  size = 20,
  className,
}: BankTransferProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M4 10h16M6 10v7M10 10v7M14 10v7M18 10v7M5 18h14M3 21h18M12 3l8 4H4l8-4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}
