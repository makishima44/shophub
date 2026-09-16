type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  weight: number;
};

type ProductsResponse = {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
};

export default async function ProductsPage() {
  const response = await fetch("https://dummyjson.com/products");
  const data: ProductsResponse = await response.json();
  console.log(data);

  return (
    <main>
      <ul>
        {data.products.map((product) => {
          return (
            <li key={product.id}>
              <h3>Title: {product.title}</h3>
              <p>Description: {product.description}</p>
              <span>Price: {product.price}</span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
