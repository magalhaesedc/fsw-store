import ProductItem from "@/components/ui/ProductItem";
import { Badge } from "@/components/ui/badge";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { PercentIcon } from "lucide-react";

const DealsPage = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge variant={"heading"}>
        <PercentIcon size={16} /> OFERTAS
      </Badge>

      <div className="grid grid-cols-2 gap-5">
        {deals.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
            className=""
          />
        ))}
      </div>
    </div>
  );
};

export default DealsPage;
