import React from "react";

import fast from "../assets/icons/delivery-bike.3781f37b210e3187f35e.png";
import home from "../assets/icons/home-delivery.7524ad4c73e11c819c2f.png";
import caseon from "../assets/icons/cash-on-delivery.png";

import test from "../assets/8ce53529-21ab-44ea-8422-0259ceb700b4-1FriSyPl33ilsVe8kp_jcc-tyDm31DcFU.jpeg";

import { BsFillStarFill } from "react-icons/bs";

const ProductDetailes = () => {
  return (
    <section>
      <div className="container mx-auto p-5">
        <div className="md:flex items-center">
          <div className="md:w-60">
            <div className="mb-7">
              <img src={test} alt="" className="w-2/4" />
            </div>
            <div className=" mb-7">
              <img src={test} alt="" className="w-2/4" />
            </div>
            <div className="mb-7">
              <img src={test} alt="" className="w-2/4" />
            </div>
          </div>

          <div className="">
            <div className="">
              <img src={test} alt="" className="w-full" />
            </div>
          </div>

          <div className="md:w-6/12 p-14">
            <div className="">
              <h1 className="text-black font-bold text-6xl mb-5">test</h1>

              <div className="flex mb-5">
                <div className=" flex gap-x-2 text-sm items-center">
                  <div className="  text-yellow-400  flex gap-2">
                    <BsFillStarFill size={15} />
                    <BsFillStarFill size={15} />
                    <BsFillStarFill size={15} />
                    <BsFillStarFill size={15} />
                    <BsFillStarFill size={15} />
                  </div>
                  <div className=" text-black px-3 font-bold text-2xl">
                    <h2>5.5</h2>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mb-5">
                <p>Category</p>
                <p>|</p>
                <p>test</p>
              </div>

              <div className="mb-5">
                <p>test</p>
              </div>

              <div className="flex gap-3 mb-16">
                <div>
                  <img className="w-11" src={fast} alt="" />
                  <p>Free Delivery</p>
                </div>

                <div>
                  <img className="w-11" src={home} alt="" />
                  <p>Free Delivery</p>
                </div>

                <div>
                  <img className="w-11" src={caseon} alt="" />
                  <p>Free Delivery</p>
                </div>
              </div>

              <div className="">
                <button className=" text-black bg-orange-300 p-2  rounded h-10 cursor-pointer border-none hover:bg-orange-500">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>{/* relatedproducts */}</div>
      </div>
    </section>
  );
};

export default ProductDetailes;
