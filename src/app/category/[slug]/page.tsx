import ProductItem from "@/components/ui/ProductItem";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_ITEM } from "@/constants/category-icon";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";

const CategoryProductsPage = async ({ params }: any) => {
  const category = await prismaClient.category.findFirst({
    where: { slug: params.slug },
    include: {
      products: true,
    },
  });

  if (!category) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 p-5">
      <div>
        <Badge
          className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
          variant={"outline"}
        >
          {CATEGORY_ITEM[params.slug as keyof typeof CATEGORY_ITEM]}{" "}
          {params.slug}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {category.products.map((product) => (
          <ProductItem
            product={computeProductTotalPrice(product)}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
