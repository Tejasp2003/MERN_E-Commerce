
import Product from "./Product";
import { useGetUserFavoriteProductsQuery } from "../../redux/api/usersApiSlice.js";

const Favorites = () => {
  const {data: favProducts} = useGetUserFavoriteProductsQuery();
  console.log(favProducts)

  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        FAVORITE PRODUCTS ({favProducts?.length })
      </h1>

      <div className="flex flex-wrap">
        {favProducts?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;