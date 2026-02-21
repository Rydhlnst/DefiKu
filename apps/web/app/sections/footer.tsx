"use client";

import Link from "next/link";
import { Twitter, MessageCircle, Github, BookOpen } from "lucide-react";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Security", href: "#security" },
  { label: "Changelog", href: "#changelog" },
];

const resourceLinks = [
  { label: "Documentation", href: "#docs" },
  { label: "API Reference", href: "#api" },
  { label: "Community Guidelines", href: "#guidelines" },
  { label: "Blog", href: "#blog" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Cookie Policy", href: "#cookies" },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/defiku", label: "Twitter" },
  { icon: MessageCircle, href: "https://discord.gg/defiku", label: "Discord" },
  { icon: Github, href: "https://github.com/defiku", label: "GitHub" },
  { icon: BookOpen, href: "https://mirror.xyz/defiku", label: "Mirror" },
];

function FooterColumn({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div>
      {title && (
        <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-white/60 hover:text-white transition-colors block mb-2"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      {/* Main Footer Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 - Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="text-lg font-bold text-white tracking-tight">
            DeFiKu
          </Link>
          <p className="text-sm text-white/60 mt-2">
            The social layer of DeFi
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 - Product */}
        <FooterColumn title="Product">
          {productLinks.map((link) => (
            <FooterLink key={link.label} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </FooterColumn>

        {/* Column 3 - Resources */}
        <FooterColumn title="Resources">
          {resourceLinks.map((link) => (
            <FooterLink key={link.label} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </FooterColumn>

        {/* Column 4 - Legal */}
        <FooterColumn title="Legal">
          {legalLinks.map((link) => (
            <FooterLink key={link.label} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </FooterColumn>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-sm text-white/60">
          © 2024 DeFiKu. All rights reserved.
        </p>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm text-white/60">All systems operational</span>
        </div>
      </div>
    </div>
  );
}
