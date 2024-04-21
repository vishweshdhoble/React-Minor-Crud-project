import { useEffect, useState , } from "react";
import React from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import { useContext } from "react";
import { toast } from "react-toastify";

const Details = () => {

  const [products, setProducts] = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const {id} = useParams();

  const navigate  =  useNavigate();

    useEffect(()=>{
        if(!product){
          setProduct(products.filter((p)=>p.id==id)[0]);
        }
    },[])

    const ProductDeleteHandler = (id) => {
      const FilteredProducts = products.filter(p=>p.id!==id);
      setProducts(FilteredProducts);
      localStorage.setItem("products",JSON.stringify(products));
      toast.error("Product Deleted Successfully")
      navigate("/");
    }

  return product ? (
    <div className="w-[70%] h-full flex justify-between items-center m-auto p-[10%]">
      <img
        className="object-contain h-[80%] w-[40%]"
        src={`${product.image}`}
        alt=""
      />
      <div className="content h-fit w-[50%] ">
        <h1 className="text-4xl">
          {product.title}
        </h1>
        <h3 className="my-5 text-zinc-400">{product.category}</h3>
        <h2 className="text-red-300 mb-3">{product.price}</h2>
        <p className="mb-[5%]">
          {product.description}
        </p>
        <Link to={`/edit/${product.id}`} className="py-2 px-5 mr-5 border border-blue-200 text-blue-300 rounded mb-3">Edit</Link>
        <button onClick={()=>ProductDeleteHandler(product.id)} className="py-2 px-5 border border-red-200 text-red-300 rounded mb-3">Delete</button>
      </div>
    </div>
  ) : <Loading/>
};

export default Details;
