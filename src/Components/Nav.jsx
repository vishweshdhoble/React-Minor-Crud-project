import React from "react";
import { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products, setProducts] = useContext(ProductContext);

  let distinct_category =
    products && products.reduce((acc, p) => [...acc, p.category], []);
  distinct_category = [...new Set(distinct_category)];

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(
      Math.random() * 255
    ).toFixed()},${(Math.random() * 255).toFixed()},0.4)`;
  };

  return (
    <nav className="w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5">
      <a
        className="py-2 px-5 border border-blue-200 text-blue-300 rounded mb-3"
        href="/create"
      >
        Add New Product
      </a>
      <hr className="my-3 w-[80%]" />
      <h1 className="text2xl mb-3 w-[80%]">Category Filter</h1>
      <div className="w-[80%]">
        {distinct_category.map((category, i) => (
          <Link
            key={i}
            to={`\?category=${category}`}
            className="gap-2 mb-3 flex items-center"
          >
            <span style={{backgroundColor:color()}} className=" w-[15px] h-[15px] rounded-full"></span>
            {category}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
