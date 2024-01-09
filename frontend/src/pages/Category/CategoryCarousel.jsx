import React from "react";
import { useGetCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import CategoryCard from "./CategoryCard";

const CategoryCarousel = () => {
  const { data: categories } = useGetCategoriesQuery();
  console.log(categories);
  return (
    <>
      
      <div className="w-screen flex flex-row space-x-8 mt-4 ml-32 mr-32 p-4 overflow-x-scroll scrollbar-hide">
        {categories &&
          categories.map((category, index) => (
            <CategoryCard
            index={index}
              key={category._id}
              name={category.name}
              image={category.image}
            />
          ))}
      </div>
    </>
  );
};

export default CategoryCarousel;
