"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProfileImageProps {
  width?: number;
  height?: number;
  showLink?: boolean;
  className?: string;
}

export default function ProfileImage({
  width = 120,
  height = 120,
  showLink = true,
  className = "",
}: ProfileImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const imageElement = (
    <div className="relative">
      <Image
        src="/digital_me.png"
        alt="Ji Yude"
        width={width}
        height={height}
        className={`rounded-full shadow-sm transition-all duration-500 ${className}`}
        style={{
          animation: isHovered ? "breathing 2s ease-in-out infinite" : "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );

  if (showLink) {
    return (
      <Link href="/about" className="flex-shrink-0 group">
        {imageElement}
      </Link>
    );
  }

  return <div className="flex-shrink-0">{imageElement}</div>;
}
