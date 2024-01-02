import { useGetUserFavoriteProductsQuery } from "../../redux/api/usersApiSlice.js";
import ProductCard from "./ProductCard.jsx";

const Favorites = () => {
  const {data: favProducts} = useGetUserFavoriteProductsQuery();

  return (
    <div className="m-3">
      <h1 className="text-lg font-bold ml-3 mb-5 ">
        FAVORITE PRODUCTS ({favProducts?.length })
      </h1> 

      <div className="flex flex-wrap gap-5">
        {favProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;