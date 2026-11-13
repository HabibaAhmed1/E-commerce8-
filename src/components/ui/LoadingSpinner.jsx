
export default function LoadingSpinner({
  size = "md",
  logoSrc = "/logo.png",
}) {
  const sizes = {
    sm: {
      outer: "h-14 w-14",
      inner: "h-11 w-11",
      logo: "h-6 w-6",
      border: "border-[3px]",
    },
    md: {
      outer: "h-24 w-24",
      inner: "h-20 w-20",
      logo: "h-10 w-10",
      border: "border-4",
    },
    lg: {
      outer: "h-28 w-28",
      inner: "h-24 w-24",
      logo: "h-12 w-12",
      border: "border-4",
    },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div
      role="status"
      aria-label="Loading"
      className="relative flex items-center justify-center"
    >
      {/* Rotating Circle */}
      <div
        className={`absolute ${currentSize.outer} rounded-full
        ${currentSize.border} border-cyan-100 border-t-cyan-500
        animate-spin`}
      />

      {/* Fixed Logo */}
      <div
        className={`flex items-center justify-center rounded-full
        bg-cyan-50 ${currentSize.inner}`}
      >
        <img
          src={logoSrc}
          alt="Logo"
          className={`${currentSize.logo} object-contain`}
        />
      </div>
    </div>
  );
}
