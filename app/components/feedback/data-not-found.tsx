"use client";

import { X } from "lucide-react";
import Image from "next/image";
import filevector from "@/assets/Vector.png";

export default function DataNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12 px-4 text-center">
      <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6">
        <div className="absolute inset-0 rounded-full bg-[#F5F8FF] flex items-center justify-center">
          <Image
            src={filevector}
            alt="File Vector"
            className="w-10 h-10 md:w-16 md:h-16"
          />
          <X
            className="absolute translate-x-2.5 translate-y-2.5 md:translate-x-3.5 md:translate-y-3.5"
            color="#155EEF"
            size={20}
            strokeWidth={2.5}
          />
        </div>
      </div>
      <h3 className="font-normal text-gray-500 mb-1 md:mb-2">
        Data belum tersedia.
      </h3>
    </div>
  );
}
