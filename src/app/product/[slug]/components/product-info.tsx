"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "name" | "description" | "basePrice" | "totalPrice" | "discountPercentage"
  >;
}
const ProductInfo = ({
  product: { name, description, basePrice, totalPrice, discountPercentage },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-lg">{name}</h2>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-extrabold">R$ {totalPrice.toFixed(2)}</h1>
        {discountPercentage > 0 && (
          <Badge className="px-2 py-[2px]">
            <ArrowDownIcon size={14} /> {discountPercentage}%
          </Badge>
        )}
      </div>

      {discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          R$ {Number(basePrice).toFixed(2)}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
        >
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-justify text-sm opacity-60">{description}</p>
      </div>

      <Button className="uppercase mt-8 font-bold">Adicionar ao carrinho</Button>

      <div className="flex justify-between items-center bg-accent mt-5 px-5 py-2 rounded-lg">
        <div className="flex items-center gap-2">
            <TruckIcon />
            <div>
                <p className="text-xs">Entrega via <span className="font-bold">FSPacket®</span></p>
                <p className="text-xs">Envio para <span className="font-bold" >todo Brasil</span></p>
            </div>
        </div>
        <p className="text-xs font-bold">Frete gratis</p>
      </div>
    </div>
  );
};

export default ProductInfo;
