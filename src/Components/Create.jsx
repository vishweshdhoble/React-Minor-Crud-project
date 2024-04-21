import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      description.trim().length < 5 ||
      price.trim().length < 1
    ) {
      alert("Every field must have atleast 4 chrecters.");
      return;
    }

    const product = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setProducts([...products, product]);
    setTitle("");
    setCategory("");
    setPrice("");
    setDescription("");
    setImage("");
    localStorage.setItem("products", JSON.stringify([...products, product]));
    toast.success("Product Added Successfully");
    navigate("/");
  };

  return (
    <form
      className="flex flex-col items-center p-[5%] w-screen h-screen"
      onSubmit={AddProductHandler}
    >
      <h1 className="w-1/2 mb-5 text-3xl">Add New Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="Title"
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="price"
          className="text-xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        type="text"
        placeholder="Enter product description here..."
        className="text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        rows={10}
      />
      <div className="w-1/2">
        <button
          type="submit"
          className="py-2 px-5 border border-blue-200 text-blue-300 rounded mb-3"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default Create;
