import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });
  const [products, setProducts] = useContext(ProductContext);

  //   const [title, setTitle] = useState("");
  //   const [price, setPrice] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [image, setImage] = useState("");
  //   const [category, setCategory] = useState("");

  const SaveProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.description.trim().length < 5 ||
      product.price.trim().length < 1
    ) {
      alert("Every field must have atleast 4 chrecters.");
      return;
    }

    const pindex = products.findIndex((p) => p.id == id);

    const copyData = [...products];
    copyData[pindex] = { ...products[pindex], ...product };

    setProducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
    toast.success("Product edited successfully");
    navigate(-1);
  };

  useEffect(() => {
    setProduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const changeHandler = (e) => {
    setProduct({...product, [e.target.name]: e.target.value });
  }

  return (
    <form
      className="flex flex-col items-center p-[5%] w-screen h-screen"
      onSubmit={SaveProductHandler}
    >
      <h1 className="w-1/2 mb-5 text-3xl">EditProduct</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={changeHandler}
        value={product && product.image}
        name="image"
      />
      <input
        type="text"
        placeholder="Title"
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={changeHandler}
        value={product && product.title}
        name="title"
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          onChange={changeHandler}
          value={product && product.category}
          name="category"
        />
        <input
          type="number"
          placeholder="price"
          className="text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          onChange={changeHandler}
          value={product && product.price}
          name="price"
        />
      </div>
      <textarea
        type="text"
        placeholder="Enter product description here..."
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={changeHandler}
        value={product && product.description}
        rows={10}
        name="description"
      />
      <div className="w-1/2">
        <button
          type="submit"
          className="py-2 px-5 border border-blue-200 text-blue-300 rounded mb-3"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Edit;
