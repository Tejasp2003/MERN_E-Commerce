import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center relative h-[300px] sm:h-[400px] rounded-lg bg-gray-100/80 p-8 shadow-slate-200 shadow-lg">
      
        <div className="flex flex-col justify-center items-center ">
          {/* <img
            src={product?.image}
            alt={product?.name}
            className={`w-[120px] h-[120px] sm:!w-[200px] sm:!h-[200px] rounded-full object-contain mt-[-40px] bg-white`}
          /> */}
          <Skeleton
            circle={true}
            height={144}
            width={144}
            // className="w-3/4 sm:w-[12rem] h-auto sm:h-[12rem] rounded-full"
          />

          {/* <h1 className="text-[12px] sm:text-[18px] font-bold flex flex-wrap mt-2 text-center">
            {product?.name.length > 20
              ? product?.name.substring(0, 30) + "..."
              : product?.name}
          </h1> */}

          <Skeleton
            height={20}
            width={180}
            className="text-base sm:text-[18px] w-full md:w-[220px] text-center mt-2 mb-2"
          />
          <div className="flex flex-col md:flex-row !justify-between items-center w-full mt-4 sm:mt-10 pl-4 pr-4 gap-3">
            {/* <p
              className={`text-[12px] font-bold flex flex-wrap text-center ${anotherBackgroundColor} border-2 border-black p-1 sm:p-2 rounded-full`}
            >
              {product.brand}
            </p> */}
            <Skeleton
              height={20}
              width={100}
              className="text-base sm:text-[18px] text-center mt-2 mb-2"
            />
            {/* <p className="text-lg text-black font-bold text-[12px]">
              ₹{product.price}
            </p> */}

            <Skeleton
              height={20}
              width={100}
              className="text-base sm:text-[18px] text-center mt-2 mb-2"
            />
          </div>
        </div>
        <div className="absolute top-0 right-[2px] cursor-pointer">
          {/* <HeartIcon product={product} /> */}
          <Skeleton circle={true} height={14} width={14} />
          
        </div>
        <div
          //   onClick={handleAddToCart}
          className="absolute bottom-2 right-5 cursor-pointer"
        >
          {/* <AiOutlineShoppingCart size={26} />
           */}
        
        </div>
  
    </div>
  );
};

export default ProductCardSkeleton;
