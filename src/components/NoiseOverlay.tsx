export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.12]"
      style={{
        backgroundImage: "url(/images/noise.gif)",
        backgroundSize: "250px",
        backgroundRepeat: "repeat",
      }}
    />
  );
}
