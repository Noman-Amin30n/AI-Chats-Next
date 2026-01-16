"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, MessageSquare, Mic } from "lucide-react";

// Wait, I haven't seen a lib/utils file. I should check if it exists or just use template literals.
// I'll stick to template literals for safety since I haven't inspected the whole project structure for "cn".

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 p-4 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md z-50 flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm font-medium text-neutral-400">
        <Sparkles className="w-4 h-4 text-orange-500" />
        <span className="text-neutral-200">AI Assistant</span>
      </div>

      <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
        <Link
          href="/"
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${
              isActive("/")
                ? "bg-neutral-800 text-white shadow-lg shadow-black/20"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }
          `}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat</span>
        </Link>
        <Link
          href="/transcribe-audio"
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${
              isActive("/transcribe-audio")
                ? "bg-neutral-800 text-white shadow-lg shadow-black/20"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }
          `}
        >
          <Mic className="w-4 h-4" />
          <span>Transcribe</span>
        </Link>
      </nav>

      {/* Spacer to balance the flex layout if needed, or just left empty for now */}
      <div className="w-[100px] hidden md:block"></div>
    </header>
  );
}
