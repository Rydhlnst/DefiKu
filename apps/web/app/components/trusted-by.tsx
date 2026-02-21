"use client";

const partners = [
  { name: "Ethereum", abbr: "ETH" },
  { name: "Coinbase", abbr: "BASE" },
  { name: "Arbitrum", abbr: "ARB" },
  { name: "Polygon", abbr: "MATIC" },
  { name: "Avalanche", abbr: "AVAX" },
  { name: "BNB Chain", abbr: "BSC" },
];

export function TrustedBy() {
  return (
    <section className="relative border-y bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
          Trusted by the best teams
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-2 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            >
              {/* Placeholder logo */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <span className="text-xs font-bold text-muted-foreground">
                  {partner.abbr.slice(0, 2)}
                </span>
              </div>
              <span className="hidden text-sm font-medium text-muted-foreground sm:block">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
