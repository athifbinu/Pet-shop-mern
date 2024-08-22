import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/mane.png";
import aboutImage from "../assets/images/about.png";
import test from "../assets/categoys/7413369.png";
import test1 from "../assets/categoys/7413375.png";
import CategorysCard from "../components/Ui/CategorysCard";
import star from "../assets/icons/star.png";
import Banner from "../assets/images/banner.png";
import HappyFace from "../assets/icons/happy-face.png";
import frame1 from "../assets/images/frame1.jpg";
import frame2 from "../assets/images/frame2.jpg";
import frame3 from "../assets/images/frame3.jpg";
import review from "../assets/Data/Review";
import Star from "../assets/icons/review.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, // This will remove the slick-arrow buttons
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false, // Make sure to add this to responsive settings as well if needed
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false, // Disable arrows for this breakpoint as well
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Disable arrows for this breakpoint as well
        },
      },
    ],
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-100 to-teal-100 py-36">
        <div className="container mx-auto flex justify-between items-center">
          <div className="w-1/2">
            <h2 className="text-3xl font-bold mb-5">
              Mtm Veterinary Medicines <br />& PetShop
            </h2>
            <p className="text-lg mb-6">The Heaven Of Your Pets</p>
            <button className="bg-primary text-white hover:bg-primary hover:text-white focus:outline-none rounded-md px-4 py-2">
              <Link to="/shop">Shop Now</Link>
            </button>
          </div>
          <div>
            <img src={heroImage} alt="Hero" />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white py-28">
        <div className="container mx-auto flex items-center justify-between">
          <div className="w-1/2">
            <img className="w-80 rounded-xl " src={aboutImage} alt="About Us" />
          </div>
          <div className="w-1/2">
            <div className="pl-8">
              <h2 className="text-3xl font-bold mb-5">About Us</h2>
              <p className="text-lg mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                vel felis a nunc rutrum dignissim. Vivamus eu arcu nec libero
                sagittis volutpat.
              </p>
              <p className="text-lg mb-6">
                Integer vehicula eu nisi vel convallis. Sed euismod lorem a
                tortor varius, vel aliquam augue malesuada.
              </p>
              <button className="bg-primary text-white hover:bg-primary hover:text-white focus:outline-none rounded-md px-4 py-2">
                <Link to="/about">Learn More</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Shop by Categories</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <br />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 ">
            <CategorysCard />
          </div>
        </div>
      </section>

      {/* Shop by Pet */}
      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Shop by Pets/animals</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <br />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 ">
            <CategorysCard />
          </div>
        </div>
      </section>

      {/* Banner */}
      <section>
        <div className="container mb-8">
          <div>
            <img className="w-full rounded-xl h-60" src={Banner} alt="Banner" />
          </div>
        </div>
      </section>

      {/* Shop by Poultry */}
      <section>
        <div className="container mb-8">
          <div className="flex gap-4 items-center justify-center">
            <img className="w-11" src={star} alt="Star Icon" />
            <span className="text-3xl font-bold">Shop by Poultry</span>
            <img className="w-11" src={star} alt="Star Icon" />
          </div>
          <br />
          <br />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 ">
            <CategorysCard />
          </div>
        </div>
      </section>

      {/* Doctor Consulting */}
      <section>
        <div className="container mb-8">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <img
                className="cursor-pointer"
                src={frame1}
                alt="Consultation 1"
              />
            </div>
            <div>
              <img
                className="mb-2 cursor-pointer"
                src={frame2}
                alt="Consultation 2"
              />
              <img
                className="cursor-pointer"
                src={frame3}
                alt="Consultation 3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="bg-gradient-to-r from-rose-100 to-teal-100 py-28">
        <div className="container">
          <div className="flex gap-4 items-center justify-center mb-8">
            <img className="w-11" src={HappyFace} alt="Happy Face" />
            <span className="text-3xl font-bold">Happy Customers</span>
            <img className="w-11" src={HappyFace} alt="Happy Face" />
          </div>

          <Slider {...settings}>
            {review.map((item) => (
              <div
                key={item.id}
                className="relative max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md w-56 m-2 "
              >
                <div className="p-2">
                  <img
                    className="object-cover"
                    src={item.img}
                    alt="Customer Review"
                  />
                </div>

                <div className="mt-4 px-5 pb-5">
                  <div className="mb-5">
                    <p>{item.reviewText}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-16">
                      {[...Array(item.rating)].map((_, index) => (
                        <img
                          key={index}
                          className="w-4"
                          src={Star}
                          alt="Star"
                        />
                      ))}
                    </div>

                    <div>
                      <p>{item.reviewerName}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default Home;
