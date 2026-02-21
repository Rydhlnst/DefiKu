"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Plus, Wallet } from "lucide-react";
import { CustomConnectButton } from "./wallet/custom-connect-button";

const navLinks = [
  { label: "Products", href: "#features", hasDropdown: true },
  { label: "Community", href: "#testimonials", hasDropdown: false },
  { label: "Pricing", href: "#pricing", hasDropdown: false },
  { label: "Docs", href: "#docs", hasDropdown: false },
];

export function StickyNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Background - Always dark */}
        <motion.div
          className="absolute inset-0 bg-muted"
          initial={{ borderBottomWidth: 0 }}
          animate={{ 
            borderBottomWidth: isScrolled ? 1 : 0,
            borderColor: "rgba(255,255,255,0.1)"
          }}
          transition={{ duration: 0.2 }}
          style={{ borderBottomStyle: "solid" }}
        />

        <nav className="relative mx-auto h-14 max-w-7xl px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 select-none">
            {/* D Box */}
            <div className="w-7 h-7 bg-background flex items-center justify-center border border-border">
              <span className="text-foreground text-sm font-bold leading-none">D</span>
            </div>
            <span className="text-base font-semibold text-white tracking-tight">
              DeFiKu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* CTA - Desktop: Wallet Connect */}
            <div className="hidden md:block">
              <CustomConnectButton />
            </div>
            
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white hover:text-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Menu Container */}
            <motion.div
              className="absolute inset-0 bg-muted flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between h-14 px-4 border-b border-border">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 select-none" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-7 h-7 bg-white flex items-center justify-center">
                    <span className="text-foreground text-sm font-bold leading-none">D</span>
                  </div>
                  <span className="text-base font-semibold text-foreground">DeFiKu</span>
                </Link>

                {/* Close Button - Black square */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 bg-background flex items-center justify-center text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border"
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between px-4 py-4 text-lg text-foreground hover:bg-muted transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      {link.hasDropdown && (
                        <Plus className="h-5 w-5 text-gray-500" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom - Wallet Connect */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 text-gray-400 text-sm mb-4 px-2">
                  <Wallet className="w-4 h-4" />
                  <span>Connect wallet to track your DeFi positions</span>
                </div>
                <CustomConnectButton className="w-full justify-center py-3" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
