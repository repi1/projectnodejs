"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance, axiosInstanceSSR } from "@/axios/axios";
import Image from "next/image";

function ProductDetailImage({ params }) {
  const userSelector = useSelector((state) => state.auth);
  const { productId } = params;
  const [product, setProduct] = useState(null);
  const fetchProduct = () => {
    axiosInstance()
      .get("/products/" + productId)
      .then((response) => setProduct(response.data.result))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  console.log(product);

  const [image, setImage] = useState("");
  useEffect(() => {
    if (product) {
      setImage(`/product_images/${product.productPhotos[0].photoURL}`);
    }
  }, [product]);
  console.log(image);

  const [qty, setQty] = useState(1);

  const SubTotal = product?.price * qty;

  const updatedStock = Number(product?.stocks) - Number(qty);

  console.log(updatedStock);

  const addToCart = () => {
    if (qty <= 0) {
      alert("Quantity harus lebih dari 0");
    } else if (updatedStock < 0) {
      alert("Stok tidak cukup");
    } else {
      axiosInstance()
        .get("/carts/" + userSelector.id)
        .then((res) => {
          const carts = res.data.result;
          const existingCart = carts.find(
            (cart) => cart.productId === productId
          );
          if (existingCart) {
            // Product already exists in cart, update quantity
            axiosInstance()
              .patch("/carts/" + existingCart.productId, {
                qty: Number(existingCart.qty) + Number(qty),
              })
              .then(() => {
                // axiosInstance().patch("/products/" + productId, {
                //   stocks: updatedStock,
                // });
                alert("Produk berhasil ditambah");
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
                alert(err.response?.data?.message);
              });
          } else {
            // Product does not exist in cart, create new entry
            axiosInstance()
              .post("/carts", {
                qty: qty,
                userId: userSelector.id,
                productId: productId,
              })
              .then(() => {
                // axiosInstance().patch("/products/" + productId, {
                //   stocks: updatedStock,
                // });
                alert("Produk berhasil dibeli");
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
                alert(err.response?.data?.message);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data?.message);
        });
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="grid justify-center rounded-lg">
        <div>
          <Image
            src={image}
            alt="thumbnail"
            width={400}
            height={400}
            className="h-80 w-80 object-cover"
          />
        </div>
        <div className="flex gap-2 m-0 my-2">
          {product &&
            product.productPhotos.map((val, key) => (
              <Image
                key={key}
                src={`/product_images/${val.photoURL}`}
                width={100}
                height={100}
                alt={`${product.name} photo ${key + 1}`}
                className="h-20 w-1/4 object-cover cursor-pointer rounded-md"
                onClick={() => setImage(`/product_images/${val.photoURL}`)}
              />
            ))}
        </div>
      </div>
      <div className="ml-10 grid">
        <div>
          <div className="text-xl font-semibold">{product?.name}</div>
          <div className="pt-5 text-2xl font-bold">Rp{product?.price}</div>
          <div>Stok Total: {product?.stocks}</div>
        </div>
        <div>
          <div>Subtotal: Rp {SubTotal}</div>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              defaultValue="1"
              min="1"
              max={product?.stocks}
              className="border-2 border-black w-9 h-10"
              onChange={(e) => setQty(e.target.value)}
            />
            <button
              className="px-10 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetailImage;
