"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export type Subscription = Awaited<ReturnType<typeof getSubscription>>;

export async function getSubscription(email: string) {
  try {
    const customers = await stripe.customers.list({
      email,
      limit: 1,
    });

    const customerID: string | null =
      customers.data.length > 0 ? customers.data[0].id : null;

    if (!customerID) {
      return null;
    }
    const subscriptions = await stripe.subscriptions.list({
      customer: customerID,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      console.log("suscription data null");
      return null;
    }

    return {
      subscription: subscriptions.data[0],
    };
  } catch (err) {
    console.log("Error:");
    console.log(err);
  }
}
