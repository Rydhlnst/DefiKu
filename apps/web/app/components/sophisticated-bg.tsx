// Sophisticated background texture for dark sections
// Inspired by Linear.app and Raycast - "expensive" feel
// Includes: noise texture, dot grid, gradient overlays, spotlight

interface SophisticatedBgProps {
  children: React.ReactNode;
  className?: string;
  showSpotlight?: boolean;
}

export function SophisticatedBg({ 
  children, 
  className = "",
  showSpotlight = true 
}: SophisticatedBgProps) {
  return (
    <div className={`relative bg-background ${className}`}>
      {/* Base noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      
      {/* Dot grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, rgb(0,0,0) 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgb(0,0,0) 40%, transparent 80%)",
        }}
      />
      
      {/* Top gradient overlay */}
      <div 
        className="absolute inset-x-0 top-0 h-[50vh] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--foreground) / 0.03) 0%, transparent 100%)",
        }}
      />
      
      {/* Bottom gradient overlay - content fade */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[30vh] pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(var(--foreground) / 0.05) 0%, transparent 100%)",
        }}
      />
      
      {/* Spotlight behind browser mockup */}
      {showSpotlight && (
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, hsl(var(--foreground) / 0.04) 0%, transparent 60%)",
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Alternative: CSS-only version with pseudo-elements for even cleaner implementation
export function SophisticatedBgPure({ 
  children, 
  className = "" 
}: SophisticatedBgProps) {
  return (
    <div 
      className={`relative bg-background ${className}`}
      style={{
        // Noise texture as base64 data URI for better performance
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"),
          radial-gradient(circle at 50% 0%, hsl(var(--foreground) / 0.03) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, hsl(var(--foreground) / 0.04) 0%, transparent 40%)
        `,
        backgroundSize: "256px 256px, 100% 100%, 800px 600px",
        backgroundPosition: "0 0, 0 0, 50% 40%",
        backgroundRepeat: "repeat, no-repeat, no-repeat",
        backgroundBlendMode: "overlay, normal, normal",
      }}
    >
      {/* Dot grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, rgb(0,0,0) 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgb(0,0,0) 40%, transparent 80%)",
        }}
      />
      
      {/* Bottom fade for content */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[30vh] pointer-events-none bg-gradient-to-t from-background to-transparent"
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
