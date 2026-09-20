import { ProductDetails } from "@/widgets/ProductDetails/ui/ProductsDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  return (
    <main>
      <ProductDetails id={id} />
    </main>
  );
}
