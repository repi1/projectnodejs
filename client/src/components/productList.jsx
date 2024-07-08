/** @format */
"use client";

import { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../axios/axios";
import Search from "../assets/search.png";
import Link from "next/link";
import Image from "next/image";
import { useDebounce } from "use-debounce";

export function ProductListComponent() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [value] = useDebounce(search, 500);

  const fetchProducts = () => {
    axiosInstance()
      .get("/products/", {
        params: {
          name: search,
        },
      })
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchProducts();
  }, [value]);

  const ps = useMemo(
    () => [...products].sort((a, b) => b.price - a.price),
    [products]
  );

  return (
    <div className="w-full bg-white">
      <div className=" pt-5 px-7 max-w-screen-2xl  w-full">
        <div className="lg:flex grid justify-between">
          <div className="flex items-center gap-3  border-gray-300 border-b">
            {/* <Image src={Search} alt="" className=" w-3 h-3" /> */}
            <input
              type="search"
              placeholder="Search any events here"
              className=" outline-none bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="mt-3 lg:mt-0 lg:ml-10">
            <select
              name="filter"
              id="filter"
              placeholder=""
              className="border p-1 w-40 "
              required
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            >
              <option value="">All Category</option>
              <option value="Meat">Meat</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid max-w-screen-2xl w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-7 gap-3">
        {ps?.map((event, key) => (
          <ProductCard {...event} key={key} />
        ))}
      </div>
    </div>
  );
}

export default ProductListComponent;

export function ProductCard({
  name,
  id,
  price,
  address,
  categories,
  productPhotos,
  stocks,
}) {
  function formatIDR(number) {
    return `Rp ${number.toLocaleString("id-ID")}`;
  }

  return (
    <Link
      className="flex flex-col bg-gray-100 rounded-xl shadow-lg"
      href={"/products/" + id}
    >
      <div className="">
        <Image
          width={400}
          height={400}
          src={
            productPhotos?.[0]?.photoURL
              ? `/product_images/${productPhotos[0].photoURL}`
              : `/product_images/default-image.jpg`
          }
          className="h-[200px] w-full pt-3 object-cover"
          alt=""
        />
      </div>
      <div>
        <div className="w-full h-full p-3 flex flex-col justify-between gap-2 ">
          <div className="text-2xl font-bold w-full">{name}</div>
          <div className="text-xl text-black font-semibold">
            {formatIDR(price)}
          </div>
          <div className="text-[#249C58]">{categories.name}</div>
          <div className="">Stocks: {stocks}</div>
        </div>
      </div>
    </Link>
  );
}
