import ProductForm from "../../ProductForm";

export default function EditProductPage({ params }) {
  return <ProductForm productId={params.id} />;
}
