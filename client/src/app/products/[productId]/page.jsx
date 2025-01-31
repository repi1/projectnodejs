import NavbarComponent from "@/components/navbar";
import ProductDetailImage from "../../../components/productDetail";
export const metadata = {
  title: "Product Detail",
  description: "Belanja di SupMart",
};

async function Page({ params }) {
  return (
    <>
      <NavbarComponent />
      <ProductDetailImage params={params} />
    </>
  );
}
export default Page;
