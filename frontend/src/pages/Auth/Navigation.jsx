import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaHeart, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice.js";
import { logout } from "../../redux/features/auth/authSlice.js";

// import "./Navigation.css";
import FavoritesCount from "../Products/FavoritesCount.jsx";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const [showSidebar, setShowSidebar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); //unwrap is used to get the actual data from the promise
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="hidden lg:flex flex-row w-full justify-between items-center p-4 bg-rose-400 z-100">
        {/* Links */}
        {/* Links will be Home, Favorites, Cart, My Orders, Account, Logout */}

        <div className="flex flex-row w-full !justify-between">
          <div className="flex items-center justify-between space-x-3">
            <Link to="/">
              <h1 className="text-3xl font-bold text-white">E-Kart</h1>
            </Link>
            <Link
              to="/"
              className="flex items-center justify-start   hover:bg-rose-200 pl-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineHome className="" size={26} />
              <span className="">HOME</span>{" "}
            </Link>

            <Link
              to="/cart"
              className="flex items-center justify-start   hover:bg-rose-200 pl-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out "
            >
              <AiOutlineShoppingCart className="" size={26} />
              <span className="">CART</span>{" "}
            </Link>

            <Link
              to="/favorites"
              className="flex items-center justify-start  hover:bg-rose-200 pl-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <FaHeart className="" size={20} />
              <span className="">FAVORITES</span>{" "}
            </Link>

            <Link
              to="/user-orders"
              className="flex items-center justify-start  hover:bg-rose-200 pl-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineShopping className="" size={26} />
              <span className=""> MY ORDERS</span>{" "}
            </Link>

            <Link
              to="/account"
              className="flex items-center justify-start  hover:bg-rose-200 pl-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineUserAdd className="" size={26} />
              <span className="">ACCOUNT</span>{" "}
            </Link>
          </div>

          {userInfo ? (
            <button
              onClick={logoutHandler}
              className="flex items-center justify-start  hover:bg-rose-200 pl-3 rounded-md ml-5 hover:scale-110 transform transition duration-300 ease-in-out "
            >
              <AiOutlineLogin className="mr-2" size={26} />
              <span className="">LOGOUT</span>{" "}
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-start  hover:bg-rose-200 pl-3 rounded-md ml-5 hover:scale-110 transform transition duration-300 ease-in-out "
            >
              <AiOutlineLogin className="mr-2" size={26} />
              <span className="">LOGIN</span>{" "}
            </Link>
          )}
        </div>
      </nav>

      <div className="lg:hidden z-[999] w-full flex! flex-row! justify-between! items-center! ">
        <div
          className={`lg:hidden flex items-center justify-center rounded-3xl fixed top-8 left-5 w-10 h-10 z-[500] cursor-pointer ${
            showSidebar
              ? "bg-rose-400"
              : "bg-rose-300  transition duration-300 ease-in-out"
          }`}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
        <div className="flex items-center justify-center h-[15vh]">
          <h1 className="text-2xl font-bold text-black">E-Kart</h1>
        </div>
      </div>

      {showSidebar && (
        <div className="lg:hidden flex flex-col items-center justify-center h-[100vh] w-[100vw] bg-rose-300 z-500 transition duration-300 ease-in-out">
          {/* Logo */}
          <div className="flex items-center justify-center h-[15vh]">
            <Link to="/">
              <h1 className="text-3xl font-bold text-white">E-Kart</h1>
            </Link>
          </div>

          <div className="flex flex-col justify-start items-center  h-[70vh]  space-y-2">
            <Link
              to="/"
              className="flex items-center justify-center   hover:bg-rose-200 p-3 rounded-md  hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineHome className="mr-2" size={26} />
              <span className="">HOME</span>{" "}
            </Link>

            <Link
              to="/cart"
              className="flex items-center justify-center   hover:bg-rose-200 p-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineShoppingCart className="mr-2" size={26} />
              <span className="">CART</span>{" "}
            </Link>

            <Link
              to="/favorites"
              className="flex items-center justify-center  hover:bg-rose-200 p-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <FaHeart className="mr-2" size={45} />
              <span className="">FAVORITES</span>{" "}
            </Link>

            <Link
              to="/user-orders"
              className="flex items-center justify-center  hover:bg-rose-200 p-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineShopping className="mr-2" size={26} />
              <span className="">ORDERS</span>{" "}
            </Link>

            <Link
              to="/account"
              className="flex items-center justify-center  hover:bg-rose-200 p-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <FaUserPlus className="mr-2" size={50} />
              <span className="">ACCOUNT</span>{" "}
            </Link>

            <button
              onClick={logoutHandler}
              className="flex items-center justify-center  hover:bg-rose-200 p-3 rounded-md hover:scale-110 transform transition duration-300 ease-in-out"
            >
              <AiOutlineLogin className="mr-2" size={26} />
              <span className="">LOGOUT</span>{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
