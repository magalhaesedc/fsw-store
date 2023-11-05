import { prismaClient } from "@/lib/prisma";
import ProductImage from "./components/product-images";
import ProductInfo from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!product) {
    return null;
  }

  return <div className="p-5 flex flex-col gap-8">
    <ProductImage imageUrls={product.imageUrls} name={product.name} />
    <ProductInfo product={computeProductTotalPrice(product)} />
  </div>;
};

export default ProductDetailsPage;
