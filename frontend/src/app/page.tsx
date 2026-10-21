import { fetchProductsFromGraphQL } from "@/lib/graphql";
import StoreClient from "@/components/StoreClient";

// Force dynamic server-side rendering so data is always fresh from WordPress GraphQL
export const dynamic = "force-dynamic";

export default async function Page() {
  const { products, bentoData, isLive } = await fetchProductsFromGraphQL();

  return (
    <StoreClient
      initialProducts={products}
      initialBentoData={bentoData}
      isLive={isLive}
    />
  );
}
