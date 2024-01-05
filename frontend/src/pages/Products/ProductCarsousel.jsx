import React, { useCallback, useEffect, useState } from "react";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import ProductHeaderCard from "./ProductHeaderCard";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

const ProductCarousel = () => {
  const getItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) return 1; // xs: For very small screens, show 1 item
    if (width < 768) return 2; // sm: For small screens, show 2 items
    if (width < 1024) return 3; // md: For medium screens, show 3 items
    return 5; // lg: For large screens and up, show 4 items
  };

  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? products.length - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= products?.length
        ? 0
        : prevIndex + itemsPerPage
    );
  }, [itemsPerPage, products?.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change slide every 3000 ms (3 seconds)

    return () => clearInterval(interval);
  }, [handleNext]);

  const getVisibleProducts = () => {
    let endIndex = currentIndex + itemsPerPage;
    if (endIndex > products.length) {
      return products
        .slice(currentIndex, products.length)
        .concat(products.slice(0, endIndex - products.length));
    }
    return products.slice(currentIndex, endIndex);
  };

  console.log("Current Index", currentIndex);
  return (
    <div className="rounded-lg relative pr-4 pl-4 mt-6">
      {isLoading ? (
        // Loading state
        <p>Loading...</p>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div>
            <h1
              className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-bold
              text-center
              m-2

            "
            >
              Our Top Products
            </h1>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-[-1px] top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full ml-2"
          >
            <FaCircleChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-[-1px] top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full mr-2"
          >
            <FaCircleChevronRight />
          </button>

          <div className="flex flex-row justify-center items-center overflow-hidden transition-transform duration-500 gap-[20px]">
            {getVisibleProducts().map((product) => (
              <ProductHeaderCard
                key={product._id}
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCarousel;
