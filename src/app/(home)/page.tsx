import Image from "next/image";
import Categories from "./components/categories";
import ProductList from "./components/product-list";
import { prismaClient } from "@/lib/prisma";
import SectionTitle from "./components/section-title";
import PromoBanner from "./components/promo-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  return (
    <div className="p-4">
      <PromoBanner
        src="/banner-home-01.png"
        alt="Até 55% de desconto só esse mês"
      />

      <Categories />

      <div className="mt-4">
        <SectionTitle>OFERTAS</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/banner-home-01.png"
        alt="Até 55% de desconto em mouses"
      />

      <div className="mt-4">
        <SectionTitle>TECLADOS</SectionTitle>
        <ProductList products={keyboards} />
      </div>
    </div>
  );
}
