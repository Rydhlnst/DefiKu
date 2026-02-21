// Server Component - Pure CSS grid pattern
// No JS overhead, GPU rendered

interface GridBackgroundProps {
  className?: string;
  color?: string;
}

export function GridBackground({ 
  className = "",
  color = "rgba(255,255,255,0.03)"
}: GridBackgroundProps) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

export function DotBackground({
  className = "",
  color = "rgba(255,255,255,0.15)"
}: GridBackgroundProps) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    />
  );
}

export function GradientBackground({
  className = "",
}: { className?: string }) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
      }}
    />
  );
}
