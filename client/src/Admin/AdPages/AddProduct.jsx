import React, { useState } from "react";
import { ImSpinner } from "react-icons/im";

import Banner from "../../assets/images/mane.png";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../Firebase/FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Swal from "sweetalert2";

import { isAuthenticated } from "../../auth";
import axios from "axios";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [ProductImage, setProductImage] = useState("");
  const [ProductName, setProductName] = useState("");
  const [ProductDesc, setProductDesc] = useState("");
  const [ProductCategory, setProductCategory] = useState("");
  const [Price, Setprice] = useState("");
  const [Offer, setOffer] = useState("");
  const [Brand, setBrand] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [catName, setCatName] = useState(""); // Category name input state

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { user, token } = isAuthenticated();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("ProductName", ProductName);
    formData.append("ProductDesc", ProductDesc);
    formData.append("ProductCategory", ProductCategory);
    formData.append("Price", Price);
    formData.append("Offer", Offer);
    formData.append("Brand", Brand);
    formData.append("ProductImage", ProductImage);

    try {
      const response = await fetch(
        `http://localhost:8000/api/product/create/${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 201) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product added successfully.",
        });
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error adding product", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the product.",
      });
    }
  };

  // add Category Function
  const newCategoryAdded = (userId, token, category) => {
    return fetch(`http://localhost:8000/api/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  };
  const addCategory = (event) => {
    event.preventDefault();
    console.log("Category:", catName);
    newCategoryAdded(user._id, token, { catName }).then((data) => {
      console.log("Response:", data);
      closeModal(); // Close modal after submitting category
    });
  };

  return (
    <section className="flex first-line:items-center h-screen  p-10  gap-11">
      {loading ? (
        <ImSpinner
          size={60}
          className="mx-auto animate-spin text-orange-600 text-4xl mt-[200px]"
        />
      ) : (
        <>
          <div className="hidden  flex-1 lg:flex w-1/2 ">
            <img src={Banner} className="w-full rounded-xl" alt="" />
          </div>

          <div className="w-1/2">
            {/* Add CARTEGORY */}

            <div>
              <div className="mb-10">
                <h2 className="text-3xl font-bold">Add Category</h2>
                <h4 className="text-lg font-semibold mb-6">
                  If you want add new Category please add from here.
                </h4>
                <button
                  onClick={openModal}
                  className="bg-orange-400 hover:bg-orange-600 text-white px-2 text-2xl rounded-lg font-medium h-10"
                >
                  Category
                </button>
              </div>

              {/* Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                      Add New Category
                    </h2>

                    <form onSubmit={addCategory}>
                      <div className="container mb-10">
                        <div className="grid md:grid-cols-2">
                          <div>
                            <label className="text-gray-600 font-medium">
                              Add Category
                            </label>
                            <input
                              className="p-2 border border-gray-300 rounded-md text-gray-700 focus:border-orange-500 focus:outline-none"
                              type="text"
                              placeholder="Enter category"
                              onChange={(e) => setCatName(e.target.value)}
                              value={catName}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500"
                      >
                        Submit
                      </button>
                    </form>

                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <h2 className="text-3xl font-bold mb-6">Add Product detail's </h2>
            <form onSubmit={addProduct}>
              <div className="mb-3">
                <label
                  htmlFor="Product Name"
                  className="block text-gray-700 text-xl font-bold mb-2"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full text-lg px-3 border font-bold rounded-lg focus:outline-none focus:ring focus:border-blue-300 h-10"
                  placeholder="Enter Product Name"
                  value={ProductName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="Product Name"
                  className="block text-gray-700 text-xl font-bold mb-2"
                >
                  Product short description
                </label>
                <input
                  type="text"
                  className="w-full text-lg px-3 border font-bold rounded-lg focus:outline-none focus:ring focus:border-blue-300 h-10"
                  placeholder="Enter Product short desciprtion"
                />
              </div>

              <div className="flex gap-7  items-center  mb-3">
                <div>
                  <label
                    htmlFor="Prise"
                    className="block text-gray-700 text-xl font-bold mb-4"
                  >
                    Prise
                  </label>
                  <input
                    type="number"
                    className="w-full text-lg px-3 border font-bold rounded-lg focus:outline-none focus:ring focus:border-blue-300 h-10"
                    placeholder="Enter Product Prize"
                    value={Price}
                    onChange={(e) => Setprice(e.target.value)}
                  />
                </div>

                <div>
                  <span className=" text-gray-700 text-xl font-bold ">
                    Offers
                  </span>

                  <select className="w-full mt-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 h-10 font-bold">
                    <option className="text-2xl">Select Offers</option>
                    <option className="text-2xl" value="Meals">
                      10 %
                    </option>
                    <option className="text-2xl" value="Arabian Food">
                      20 %
                    </option>

                    <option className="text-2xl" value="Burger">
                      30 %
                    </option>
                    <option className="text-2xl" value="Juices">
                      40 %
                    </option>
                    <option className="text-2xl" value="Sandwiches">
                      50 %
                    </option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="manufacture-details"
                  className="block text-gray-700 text-xl font-semibold mb-2"
                >
                  Manufacture Details
                </label>
                <textarea
                  id="manufacture-details"
                  className="w-full p-3 text-lg text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out h-32 resize-none"
                  placeholder="Enter manufacture details"
                ></textarea>
              </div>

              <div className="">
                <span className=" block text-gray-700 text-2xl font-bold mb-2 ">
                  Image
                </span>
                <input
                  type="file"
                  className="font-medium "
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </div>

              <button
                type="submit"
                className="bg-orange-400 hover:bg-orange-600  text-white px-4 text-2xl rounded-lg font-medium h-12 w-52 mt-5"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </section>
  );
};

export default AddProduct;
