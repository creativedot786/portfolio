"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="w-full flex justify-between items-center py-4 md:py-6">
      <Link href="/" className="flex items-center group">
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={48}
          height={48}
          className="group-hover:opacity-90 transition-opacity"
        />
      </Link>
      <nav>
        <Link href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
          Contact
        </Link>
      </nav>
    </header>
  );
}
