import NavbarComponent from "@/components/navbar";
import CartListComponent from "../../../components/cartList";
export const metadata = {
  title: "Cart Items",
  description: "Cart items detail",
};

async function Page({ params }) {
  return (
    <>
      <NavbarComponent />
      <CartListComponent />
    </>
  );
}
export default Page;
