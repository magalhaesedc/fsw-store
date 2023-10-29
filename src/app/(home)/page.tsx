"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4">
      <Image
        src="/banner-home-01.png"
        alt="Até 55% de desconto só esse mês"
        height={0}
        width={0}
        sizes="100vw"
        className="w-full h-auto"
      />
    </div>
  );
}
