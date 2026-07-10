'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Team', href: '/team' },
    { name: 'Vision & Goals', href: '/vision' },
    { name: 'Updates', href: '/updates' },
    { name: 'Robotics', href: '/robotics' },
    { name: 'Ai-Agent', href: '/ai-agent' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex h-16 items-center justify-between">
          {/* Left Logo */}
          <Link href="/" className="flex items-center gap-3 group min-w-0">
            <img
              src="/IconWeb.png"
              alt="Krishi Rover Logo"
              className="h-11 w-11 rounded-xl object-cover shadow-md"
            />

            <div className="flex flex-col leading-tight min-w-0">
              <span className="font-bold text-base sm:text-lg text-foreground group-hover:text-emerald-600 transition-colors truncate">
                krishi Rover
              </span>
              <span className="hidden sm:block text-xs text-muted-foreground">
                Adaptive Spot Watering
              </span>
            </div>
          </Link>

          {/* Right Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:text-emerald-600 hover:bg-emerald-500/10 transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-muted border border-border"
            aria-label="Toggle navigation menu"
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-emerald-500/10 hover:text-emerald-600 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}