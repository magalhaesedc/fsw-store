import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";

const Cart = () => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);

  return (
    <div className="flex flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant={"outline"}
      >
        <ShoppingCartIcon size={16} /> CARRINHO
      </Badge>

      <div className="flex flex-col gap-5">
        {products.length > 0 ? (
          products.map((product) => (
            <CartItem
              product={computeProductTotalPrice(product) as any}
              key={product.id}
            />
          ))
        ) : (
          <p className="text-center font-semibold">
            Carinho vazio. Vamos fazer compras?
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Separator />

        <div className="flex justify-between items-center text-xs">
          <p>Subtotal</p>
          <p>R$ {subtotal.toFixed(2)}</p>
        </div>

        <Separator />

        <div className="flex justify-between items-center text-xs">
          <p>Entrega</p>
          <p>Frete Gratis</p>
        </div>

        <Separator />

        <div className="flex justify-between items-center text-xs">
          <p>Descontos</p>
          <p>- R$ {totalDiscount.toFixed(2)}</p>
        </div>

        <Separator />

        <div className="flex justify-between items-center font-bold text-xs">
          <p>Total</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
