import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const SK = process.env.STRIPE_SECRET_KEY;
const WSK = process.env.STRIPE_WEBHOOK_SECRET_KEY;

console.log('STRIPE_SECRET_KEY', SK);
console.log('STRIPE_WEBHOOK_SECRET_KEY', WSK);

const stripe = new Stripe(SK, {
  apiVersion: "2023-10-16",
});

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    WSK,
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"],
      },
    );
    const lineItems = sessionWithLineItems.line_items;

    // ATUALIZAR PEDIDO
    await prismaClient.order.update({
      where: {
        id: session.metadata.orderId,
      },
      data: {
        status: "PAYMENT_CONFIRMED",
      },
    });
  }

  return NextResponse.json({ received: true });
};