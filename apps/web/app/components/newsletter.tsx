"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border bg-card p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold text-card-foreground sm:text-3xl">
            Sign-up for our newsletter.
          </h2>
          <p className="mb-8 text-muted-foreground">
            Stay updated with the latest DeFi trends, product updates, and exclusive offers.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-full border bg-input px-6 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {status === "success" && (
            <p className="mt-4 text-sm text-green-600 dark:text-green-400">
              Thanks for subscribing! Check your inbox.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm text-destructive">
              Please enter a valid email address.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
