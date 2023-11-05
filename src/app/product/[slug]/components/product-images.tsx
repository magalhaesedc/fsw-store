"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  name: string;
  imageUrls: string[];
}

const ProductImage = ({ name, imageUrls }: ProductImageProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent">
        <Image
          src={currentImage}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
          className="max-w-80% h-auto max-h-[70%] w-auto"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4">
        {imageUrls.map((imageUrl) => (
          <div
            key={imageUrl}
            className={`flex h-[100px] items-center justify-center rounded-lg bg-accent ${imageUrl === currentImage && "border-2 border-solid border-primary"}`}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              width={0}
              height={0}
              sizes="100vw"
              style={{ objectFit: "contain" }}
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
