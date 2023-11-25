"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PackageSearchIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { Badge } from "./badge";

const Header = () => {
  const { status, data } = useSession();

  const { products } = useContext(CartContext);

  const cartQuantityItems = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[90%]">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>

          {status === "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-2">
                <Avatar>
                  <AvatarFallback>
                    {data.user?.name?.[0].toLocaleUpperCase()}
                  </AvatarFallback>
                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>

                <div>
                  <p className="font-medium">{data.user.name}</p>
                  <p className="text-sm opacity-75">Boas Compras</p>
                </div>
              </div>

              <Separator />
            </div>
          )}

          <div className="mt-2 flex flex-col items-center gap-2">
            {status === "unauthenticated" && (
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogInIcon size="16" />
                Fazer Login
              </Button>
            )}

            <SheetClose asChild className="w-full">
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <HomeIcon size="16" />
                  Início
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild className="w-full">
              <Link href="/orders">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <PackageSearchIcon size="16" />
                  Meus Pedidos
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild className="w-full">
              <Link href="/deals">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <PercentIcon size="16" />
                  Ofertas
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild className="w-full">
              <Link href="/catalog">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ListOrderedIcon size="16" />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>

            {status === "authenticated" && (
              <Button
                onClick={handleLogoutClick}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogOutIcon size="16" />
                Logout
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/">
        <h1 className="text-lg font-semibold">
          <span className="text-primary">EDSON</span> Store
        </h1>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="relative">
            {cartQuantityItems > 0 && (
              <Badge
                className={`absolute right-[calc(-1.25rem/2)] top-[calc(-1.25rem/2)] flex h-6 w-6 items-center justify-center text-xs font-bold`}
              >
                {cartQuantityItems > 9 ? "9+" : cartQuantityItems}
              </Badge>
            )}
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>

        <SheetContent className="w-[90%]">
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Header;
