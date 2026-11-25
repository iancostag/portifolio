import React from "react";

export function EldoradoLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="10" fill="#081838" />
      <path d="M12 20L20 12L28 20L20 28L12 20Z" stroke="#38bdf8" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="20" cy="20" r="3.5" fill="#38bdf8" />
      <path d="M20 7V12M20 28V33M7 20H12M28 20H33" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function StudioFlavioLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="10" fill="#0c1e3d" />
      <path d="M20 10C20 10 13 18 13 23C13 26.866 16.134 30 20 30C23.866 30 27 26.866 27 23C27 18 20 10 20 10Z" stroke="#38bdf8" strokeWidth="2" />
      <path d="M17 22H23M17 18H23M18 26H22" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function SpuItracLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="10" fill="#0a1a3a" />
      <path d="M10 28H30M12 28V19M28 28V19M17 28V19M23 28V19" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 19L20 11L32 19H8Z" stroke="#60a5fa" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function SingularGovLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="10" fill="#081833" />
      <path d="M12 15C12 13.3431 13.3431 12 15 12H25C26.6569 12 28 13.3431 28 15V25C28 26.6569 26.6569 28 25 28H15C13.3431 28 12 26.6569 12 25V15Z" stroke="#38bdf8" strokeWidth="2" />
      <path d="M16 20L19 23L24 17" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="12" r="2.5" fill="#60a5fa" />
    </svg>
  );
}

export function UnbLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="10" fill="#08183a" />
      {/* Elementos arquitetônicos Niemeyer / UnB */}
      <path d="M11 28V14C11 14 15 12 20 12C25 12 29 14 29 14V28" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M16 28V17M24 28V17" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="20" cy="16" r="2" fill="#38bdf8" />
    </svg>
  );
}
