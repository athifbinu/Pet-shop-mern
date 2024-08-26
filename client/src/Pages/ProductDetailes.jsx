import React, { useState } from "react";

import fast from "../assets/icons/delivery-bike.3781f37b210e3187f35e.png";
import home from "../assets/icons/home-delivery.7524ad4c73e11c819c2f.png";
import caseon from "../assets/icons/cash-on-delivery.png";

import test from "../assets/8ce53529-21ab-44ea-8422-0259ceb700b4-1FriSyPl33ilsVe8kp_jcc-tyDm31DcFU.jpeg";

import { BsFillStarFill } from "react-icons/bs";
import ProductCard from "../components/Ui/ProductCard";

const ProductDetailes = () => {
  const [activeSection, setActiveSection] = useState("description");

  return (
    <section>
      <div className="container mx-auto p-5">
        <div className="md:flex  justify-center mb-10">
          <div className="flex items-center ">
            <div className="">
              <div className=" border cursor-pointer  border-orange-500 p-1 rounded-lg mb-6">
                <img src={test} alt="" className="w-20" />
              </div>

              <div className=" border cursor-pointer  border-orange-500 p-1 rounded-lg mb-6">
                <img src={test} alt="" className="w-20" />
              </div>

              <div className=" border cursor-pointer  border-orange-500 p-1 rounded-lg mb-6">
                <img src={test} alt="" className="w-20" />
              </div>
            </div>

            <div className="">
              <img src={test} alt="" className="w-full h-80" />
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
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dmnis
                  asperiores laudantium.
                </p>
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
        <div>
          <div className="grid md:grid-cols-3">
            <div
              className={`p-4 border border-gray-200 shadow-md rounded text-center cursor-pointer ${
                activeSection === "description" ? "bg-gray-100" : ""
              }`}
              onClick={() => setActiveSection("description")}
            >
              <h2 className="text-lg font-semibold">Description</h2>
            </div>
            <div
              className={`p-4 border border-gray-200 shadow-md rounded text-center cursor-pointer ${
                activeSection === "review" ? "bg-gray-100" : ""
              }`}
              onClick={() => setActiveSection("review")}
            >
              <h2 className="text-lg font-semibold">Review</h2>
            </div>
            <div
              className={`p-4 border border-gray-200 shadow-md rounded text-center cursor-pointer ${
                activeSection === "manufacture" ? "bg-gray-100" : ""
              }`}
              onClick={() => setActiveSection("manufacture")}
            >
              <h2 className="text-lg font-semibold">Manufacture Details</h2>
            </div>
          </div>

          <div className="container border border-orange-200 rounded-md shadow-2xl p-4 ">
            {activeSection === "description" && (
              <section>
                <div className="mt-4">
                  <p>
                    Make playtime extra tasty for your best friend with the JW
                    Pet Rockin Treat Ball. This ball rocks, rolls, and slides
                    while dispensing treats for hours of delicious fun. It
                    features a tough non-toxic nylon frame with openings that
                    can hold up to even the toughest of chewers...
                  </p>
                </div>

                <div className="mt-4">
                  <h2 className="font-bold text-lg">Key Features:</h2>
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Put a tasty twist on playtime.</li>
                    <li>
                      Playful learning activity toy, use as a toy or treat
                      dispenser for hours of fun.
                    </li>
                    <li>
                      Tough certified non-toxic frame and easy-to-carry design.
                    </li>
                    <li>Withstands tough chewers.</li>
                    <li>
                      Just fill with your pup’s favorite treats or kibble (sold
                      separately).
                    </li>
                  </ul>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    Dimensions: 8.5x5.5x9 in / 22x14x23
                  </p>
                  <p className="text-sm text-gray-600">Product Weight: 1 lb</p>
                </div>
              </section>
            )}
            {activeSection === "review" && (
              <section>
                <h2>Review Section</h2>
                <p>This is the review content.</p>
              </section>
            )}
            {activeSection === "manufacture" && (
              <section>
                <h2>Manufacture Details Section</h2>
                <p>This is the manufacture details content.</p>
              </section>
            )}
          </div>
        </div>

        <section>
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 ">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ProductDetailes;
