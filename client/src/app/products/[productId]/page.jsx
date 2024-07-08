import NavbarComponent from "@/components/navbar";
import ProductDetailImage from "../../../components/productDetail";
export const metadata = {
  title: "Event Detail",
  description: "tempat jualan tiket :)",
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
