
import { useGetUserFavoriteProductsQuery } from "../../redux/api/usersApiSlice";

const FavoritesCount = () => {
  const {data:favProducts} = useGetUserFavoriteProductsQuery();
  const favoriteCount = favProducts?.length;

  return (
    <div className="absolute bottom-0 left-4">
      {favoriteCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-red-500 rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;