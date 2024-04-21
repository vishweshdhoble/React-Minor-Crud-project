import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
  const [products, setProducts] = useContext(ProductContext);
  const {search} = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  const [filteredProducts, setFilteredProducts] = useState(null);

  // const getProductCategory = async() =>{
  //   try {
  //       const {data} = await axios.get(`/products/category/${category}`);
  //       setFilteredProducts(data);
  //   } catch (error) {
  //       console.log(error);
  //   }
  // }

  useEffect(()=>{
    if(!filteredProducts || category == 'undefined') setFilteredProducts(products);
    if(category != "undefined"){
        setFilteredProducts(products.filter(p=>p.category == category));
    }
  },[category,products])

  return products ? (
    <>
      <Nav></Nav>
      <div className="w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filteredProducts && filteredProducts.map((p,i)=>(
            <Link key={p.id}
            to={`/details/${p.id}`}
            className="card p-3 w-[18%] h-[30vh] mr-3 mb-3 flex flex-col justify-center items-center border shadow rounded"
          >
            <div
              className="hover:scale-110 mb-3 bg-center w-full h-[80%] bg-contain bg-no-repeat"
              style={{
                backgroundImage:
                  `url(${p.image})`,
              }}
            ></div>
            <h1 className="hover:text-blue-300 text-center">{p.title}</h1>
          </Link>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
