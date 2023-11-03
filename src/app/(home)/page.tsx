import Image from "next/image";
import Categories from "./components/categories";
import ProductList from "./components/product-list";
import { prismaClient } from "@/lib/prisma";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  return (
    <div className="p-4">
      <Image
        src="/banner-home-01.png"
        alt="Até 55% de desconto só esse mês"
        height={0}
        width={0}
        sizes="100vw"
        className="h-auto w-full"
      />

      <Categories />

      <ProductList products={deals} />
    </div>
  );
}
