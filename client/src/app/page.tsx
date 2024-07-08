import Image from "next/image";
import Link from "next/link";
import { NavbarComponent } from "../components/navbar";
import { ProductListComponent } from "../components/productList";

export default function Home() {
  // const userSelector = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // const logout = () => {
  //   dispatch(functionLogout());
  // };

  return (
    <main className="">
      <NavbarComponent />
      <ProductListComponent />
    </main>
  );
}
