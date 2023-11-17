import { CartContext, CartProduct } from "@/providers/cart";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handledecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id);
  };

  const handIncreaseProductQuantityClick = () => {
    increaseProductQuantity(product.id);
  };

  const handRemoveProductClick = () => {
    removeProductFromCart(product.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            alt={product.name}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          />
        </div>

        <div className="flex flex-col gap-1 ">
          <p className="text-xs">
            {product.name}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              R$ {product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6"
              onClick={handledecreaseProductQuantityClick}
            >
              <ArrowLeftIcon size={12} />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6"
              onClick={handIncreaseProductQuantityClick}
            >
              <ArrowRightIcon size={12} />
            </Button>
          </div>
        </div>
      </div>
      <Button size="icon" className="h-7 w-7" variant="outline" onClick={handRemoveProductClick}>
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
