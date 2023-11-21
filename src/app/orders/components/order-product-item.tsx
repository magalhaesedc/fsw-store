import { computeProductTotalPrice } from "@/helpers/product";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderPrductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

const OrderPrductItem = ({ orderProduct }: OrderPrductItemProps) => {
  const productWithTotalPrice = computeProductTotalPrice(orderProduct.product);
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[77px] w-[77px] min-w-[77px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProduct.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          alt={orderProduct.product.name}
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="w-fit rounded-md bg-accent px-2 py-1">
          <p className="text-[10px]">
            Vendido e entregue por <span className="font-bold">FSW Store</span>
          </p>
        </div>
        <p className="text-xs">{orderProduct.product.name}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">R$ {productWithTotalPrice.totalPrice.toFixed(2)}</p>

            {productWithTotalPrice.discountPercentage > 0 && (
              <p className="font-xs line-through opacity-60">R$ {productWithTotalPrice.basePrice.toFixed(2)}</p>
            )}
          </div>
          <p className="text-xs opacity-50">Qntd: {orderProduct.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderPrductItem;
