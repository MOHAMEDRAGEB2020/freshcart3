import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { HelmetProvider,Helmet } from 'react-helmet-async';

export default function Brands() {
  let [brands, setBrands] = useState("");

  async function getBrands() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((respose) => {
        setBrands(respose.data);
      })
      .catch((err) => err);
  }
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
       <HelmetProvider>
      <Helmet>
    <title>FreshCart/Brand</title>
  </Helmet>
  </HelmetProvider>
   
      <div className="flex flex-wrap pt-8 items-center  ">
        {brands?.data?.map((product) => {
          return (
            <div
              className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2  "
              key={product._id}
            >
              <div className="product shadow-lg pb-8 dark:bg-slate-700">
                <img
                  src={product.image}
                  className="w-full   object-cover"
                  alt={product.title}
                />
                <div className="p-2">
                  <h3 className="text-green-500 font-light">{product.slug}</h3>
                  <p className="font-semibold sm:text-[12px] line-clamp-1">
                    {product.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
