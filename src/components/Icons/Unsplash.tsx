function Unsplash({ size }: { size: number }) {
  return (

    <svg height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_29_32)">
        <path d="M32 18.6166V31.998H8V18.6166H15.5604V25.3073H24.4396V18.6166H32Z" fill="url(#paint0_linear_29_32)" />
        <path d="M15.5605 8.00195H24.4398V14.6927H15.5605V8.00195Z" fill="url(#paint1_linear_29_32)" />
      </g>
      <defs>
        <linearGradient id="paint0_linear_29_32" x1="20" y1="18.6166" x2="20" y2="31.998" gradientUnits="userSpaceOnUse">
          <stop stop-color="#2A2C41" />
          <stop offset="1" stop-color="#464B6D" />
        </linearGradient>
        <linearGradient id="paint1_linear_29_32" x1="20.0001" y1="8.00195" x2="20.0001" y2="14.6927" gradientUnits="userSpaceOnUse">
          <stop stop-color="#2A2C41" />
          <stop offset="1" stop-color="#464B6D" />
        </linearGradient>
        <clipPath id="clip0_29_32">
          <rect width="24" height="24" fill="white" transform="translate(8 8)" />
        </clipPath>
      </defs>
    </svg>

  )
}

export default Unsplash
