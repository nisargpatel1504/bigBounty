"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { type Subscription, getSubscription } from "./actions";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [subscription, setSubscription] = useState<Subscription>();

  useEffect(() => {
    async function fetchSubscriptionData() {
      console.log("hello");
      if (!user) {
        console.log("user not found");
        return;
      }
      if (!user?.email) return;

      const subscriptionData = await getSubscription(user?.email);
      if (!subscriptionData) {
        console.log("subscription is not taken");
      }
      console.log(subscriptionData);
      setSubscription(subscriptionData);
    }
    fetchSubscriptionData().catch(console.error);
  }, [user]);

  if (error) {
    console.log(error);
  }
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <>
          Welcome {user.email}
          {!subscription && (
            <>
              <Script async src="https://js.stripe.com/v3/pricing-table.js" />
              <div
                dangerouslySetInnerHTML={{
                  __html: `<stripe-pricing-table pricing-table-id="prctbl_1OdDLiH7cbS2zToyVFxUsQRl"
                  publishable-key="pk_test_51OdDFCH7cbS2zToyhRaK7o2xfzL7m0ooh46FGHSlR3rx1Xk0ob1ynTQlgeFMP7JrlEbZwWQur1ffWrJRpcsC4Tsx00WdB3rhGu">
                  </stripe-pricing-table>`,
                }}
              ></div>
            </>
          )}
          <a href="/api/auth/logout">Logout</a>
        </>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </main>
  );
}
