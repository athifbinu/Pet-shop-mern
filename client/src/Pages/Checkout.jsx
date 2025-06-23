import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdArrowBackIosNew } from "react-icons/md";
import CountryDrop from "../components/Ui/CountryDrop";

// Icons
import gp from "../assets/icons/google-pay.png";
import pt from "../assets/icons/Paytm-Logo.wine.svg";
import pn from "../assets/icons/PhonePe-Logo.wine.svg";
import ms from "../assets/icons/Amazon_Pay-Logo.wine.svg";
import bhim from "../assets/icons/bhim.svg";
import mc from "../assets/icons/Mastercard-Logo.wine.svg";
import vs from "../assets/icons/Visa_Inc.-Logo.wine.svg";

const Checkout = () => {
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    country: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminPhone = "7594013460"; // ✅ Replace with real admin number

    const products = cartItems
      .map(
        (item, index) =>
          `\n${index + 1}. ${item.productName} - ₹${item.price} x ${
            item.quantity
          } = ₹${item.price * item.quantity}`
      )
      .join("");

    const message = `🛒 *New Order Received!*

👤 *Customer Details*
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}, ${formData.landmark}, ${formData.city}, ${
      formData.pincode
    }, ${formData.country}

📦 *Order Summary*
${products}

🧾 Subtotal: ₹${totalAmount}
🚚 Shipping: ₹10
💰 Total: ₹${totalAmount + 10}`;

    const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container px-4">
      <section className="mt-24">
        <h1 className="text-2xl font-bold mb-5">Checkout Form</h1>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-10">
          {/* Left: Billing Form */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-3 mb-5">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="p-2 w-full border rounded-md"
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="p-2 w-full border rounded-md"
                  placeholder="Last Name"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2 w-full border rounded-md"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="p-2 w-full border rounded-md"
                  placeholder="Phone Number"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="p-2 w-full border rounded-md"
                  placeholder="Address"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="p-2 w-full border rounded-md"
                  placeholder="Landmark"
                />
              </div>

              <div className="flex gap-3 mb-5">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="p-2 w-full border rounded-md"
                  placeholder="City"
                  required
                />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="p-2 w-full border rounded-md"
                  placeholder="Country"
                  required
                />
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="p-2 w-full border rounded-md"
                  placeholder="Pin Code"
                  required
                />
              </div>

              <div className="flex justify-between mt-10 mb-14">
                <div className="flex items-center cursor-pointer text-gray-600">
                  <MdArrowBackIosNew />
                  <p>Return</p>
                </div>
                <button
                  type="submit"
                  className="bg-black text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 uppercase"
                >
                  Send to WhatsApp
                </button>
              </div>

              {/* Payment Options */}
              <div className="flex justify-between items-center">
                {[gp, pt, pn, ms, bhim, mc, vs].map((icon, i) => (
                  <img key={i} className="w-12" src={icon} alt="pay option" />
                ))}
              </div>
            </form>
          </div>

          {/* Right: Cart Summary */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Your Order</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-5 mb-4 border-b pb-2"
                >
                  <img
                    src={item.imgUrl}
                    className="w-16 h-16 object-cover rounded"
                    alt={item.productName}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))
            )}

            {/* Totals */}
            <div className="mt-5">
              <div className="flex justify-between mb-2">
                <p className="font-medium">Subtotal</p>
                <p>₹{totalAmount}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="font-medium">Shipping</p>
                <p>₹10</p>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-bold">
                <p>Total</p>
                <p>₹{totalAmount + 10}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
