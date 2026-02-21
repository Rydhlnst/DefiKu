"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { 
    label: "Products", 
    href: "#products",
    dropdown: {
      featured: {
        label: "All Products",
        title: "Explore our suite",
        href: "#all-products"
      },
      columns: [
        {
          title: "Analytics",
          items: [
            { label: "Portfolio Tracking", href: "#portfolio" },
            { label: "Risk Monitoring", href: "#risk" },
            { label: "Yield Optimizer", href: "#yield" },
            { label: "Tax Reports", href: "#tax" },
          ]
        },
        {
          title: "Social",
          items: [
            { label: "Social Feed", href: "#social" },
            { label: "Copy Trading", href: "#copy" },
            { label: "Alpha Sharing", href: "#alpha" },
            { label: "Community", href: "#community" },
          ]
        },
        {
          title: "Tools",
          items: [
            { label: "Gas Optimizer", href: "#gas" },
            { label: "Alert System", href: "#alerts" },
            { label: "API Access", href: "#api" },
            { label: "Mobile App", href: "#mobile" },
          ]
        }
      ]
    }
  },
  { 
    label: "Solutions", 
    href: "#solutions",
    dropdown: {
      featured: {
        label: "All Solutions",
        title: "Built for every farmer",
        href: "#all-solutions"
      },
      columns: [
        {
          title: "By Type",
          items: [
            { label: "For Traders", href: "#traders" },
            { label: "For Farmers", href: "#farmers" },
            { label: "For Institutions", href: "#institutions" },
            { label: "For Developers", href: "#developers" },
          ]
        },
        {
          title: "By Chain",
          items: [
            { label: "Ethereum", href: "#eth" },
            { label: "Solana", href: "#sol" },
            { label: "Arbitrum", href: "#arb" },
            { label: "Base", href: "#base" },
          ]
        },
        {
          title: "Use Cases",
          items: [
            { label: "Yield Farming", href: "#yield-farming" },
            { label: "Liquidity Mining", href: "#liquidity" },
            { label: "Vault Management", href: "#vaults" },
            { label: "Strategy Backtesting", href: "#backtest" },
          ]
        }
      ]
    }
  },
  { 
    label: "Resources", 
    href: "#resources",
    dropdown: {
      featured: {
        label: "All Resources",
        title: "Explore our knowledge hub",
        href: "#all-resources"
      },
      columns: [
        {
          title: "Learn",
          items: [
            { label: "Documentation", href: "#docs" },
            { label: "Blog", href: "#blog" },
            { label: "Case Studies", href: "#cases" },
            { label: "Guides", href: "#guides" },
          ]
        },
        {
          title: "Connect",
          items: [
            { label: "Community", href: "#community" },
            { label: "Discord", href: "#discord" },
            { label: "Twitter/X", href: "#twitter" },
            { label: "Newsletter", href: "#newsletter" },
          ]
        },
        {
          title: "Company",
          items: [
            { label: "About Us", href: "#about" },
            { label: "Careers", href: "#careers" },
            { label: "Brand Kit", href: "#brand" },
            { label: "Contact", href: "#contact" },
          ]
        }
      ]
    }
  },
  { 
    label: "Integrations", 
    href: "#features",
    hasDropdown: false
  },
  { 
    label: "Careers", 
    href: "#testimonials",
    hasDropdown: false
  },
];

interface NavItemProps {
  label: string;
  href: string;
  dropdown?: {
    featured: {
      label: string;
      title: string;
      href: string;
    };
    columns: {
      title: string;
      items: { label: string; href: string }[];
    }[];
  };
  hasDropdown?: boolean;
}

function NavItem({ label, href, dropdown, hasDropdown = true }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!hasDropdown) {
    return (
      <Link 
        href={href}
        className="text-sm text-white/70 hover:text-white transition-colors py-5"
      >
        {label}
      </Link>
    );
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link 
        href={href}
        className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors py-5"
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-white/70 ${isOpen ? 'rotate-180' : ''}`} />
      </Link>

      {/* Large Dropdown Menu */}
      <AnimatePresence>
        {dropdown && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 bg-[hsl(0,0%,12%)] top-24 border-b border-white/10 z-50"
          >
            <div className="max-w-7xl mx-auto px-8 py-8">
              <div className="grid grid-cols-12 gap-8">
                {/* Featured Section - Left */}
                <div className="col-span-3 border-r border-white/10 pr-8">
                  <span className="text-xs uppercase tracking-wider text-white/60">
                    {dropdown.featured.label}
                  </span>
                  <h3 className="text-xl text-white mt-2 font-normal">
                    {dropdown.featured.title}
                  </h3>
                  <Link 
                    href={dropdown.featured.href}
                    className="inline-flex items-center gap-2 text-sm text-white mt-4 hover:gap-3 transition-all"
                  >
                    View all {label.toLowerCase()}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Columns - Right */}
                {dropdown.columns.map((column, idx) => (
                  <div key={idx} className="col-span-3">
                    <h4 className="text-sm font-medium text-white mb-4">
                      {column.title}
                    </h4>
                    <ul className="space-y-3">
                      {column.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className="text-sm text-white/70 hover:text-white transition-colors"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(0,0%,12%)] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="h-24 flex items-center justify-between">
          
          {/* Left Section - Logo */}
          <Link href="/" className="text-lg font-bold tracking-tight text-white">
            DeFiKu
          </Link>

          {/* Center Section - Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavItem key={link.label} {...link} />
            ))}
          </div>

          {/* Right Section - Auth */}
          <div className="flex items-center gap-6">
            <Link 
              href="/signin" 
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link 
              href="/signup" 
              className="text-sm font-medium bg-white text-foreground px-5 py-3 hover:bg-white/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}