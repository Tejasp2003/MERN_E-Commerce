import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice.js";
import { useGetCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import { toast } from "react-hot-toast";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      console.log("Product Data", productData);
      console.log("name", name);
      const data = await createProduct(productData).unwrap();
      console.log("Data", data);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log(res);
      toast.success(res.message);
      setImage(res.imageUrl);
      setImageUrl(res.imageUrl);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const openCloudinaryWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName:"dh8gfmbp2",
        uploadPreset: "embmj1ia",
        sources: ["local", "url", "camera"],
        cropping: true,
        multiple: false,
        folder: "E-COMMERCE",
        tags: ["Products"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Upload Success:", result.info);
          setImageUrl(result.info.secure_url);
          setImage(result.info.secure_url);
          toast.success("Image uploaded successfully");
        }
        else if(error){
          toast.error(error?.data?.message || error.error);
        }

      }
    );
  };

  useEffect(() => {
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // return (
  //   <div className="container xl:mx-[9rem] sm:mx-[0]">
  //     <div className="flex flex-col md:flex-row">
  //       <AdminMenu />
  //       <div className="md:w-3/4 p-3">
  //         <div className="h-12">Create Product</div>

  //         {imageUrl && (
  //           <div className="text-center">
  //             <img
  //               src={imageUrl}
  //               alt="product"
  //               className="block mx-auto max-h-[200px]"
  //             />
  //           </div>
  //         )}

  //         {/* <div className="mb-3">
  //           <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
  //             {image ? image.name : "Upload Image"}

  //             <input
  //               type="file"
  //               name="image"
  //               accept="image/*"
  //               onChange={uploadFileHandler}
  //               className={!image ? "hidden" : "text-white"}
  //             />
  //           </label>
  //         </div> */}

  //         <div className="mb-3">
  //           <button
  //             className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11"
  //             onClick={openCloudinaryWidget}
  //           >
  //             Upload Image
  //           </button>
  //         </div>
  //         <div className="p-3">
  //           <div className="flex flex-wrap">
  //             <div className="one">
  //               <label htmlFor="name">Name</label> <br />
  //               <input
  //                 type="text"
  //                 className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
  //                 value={name}
  //                 onChange={(e) => setName(e.target.value)}
  //               />
  //             </div>
  //             <div className="two ml-10 ">
  //               <label htmlFor="name block">Price</label> <br />
  //               <input
  //                 type="number"
  //                 className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
  //                 value={price}
  //                 onChange={(e) => setPrice(e.target.value)}
  //               />
  //             </div>
  //           </div>
  //           <div className="flex flex-wrap">
  //             <div className="one">
  //               <label htmlFor="name block">Quantity</label> <br />
  //               <input
  //                 type="number"
  //                 className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
  //                 value={quantity}
  //                 onChange={(e) => setQuantity(e.target.value)}
  //               />
  //             </div>
  //             <div className="two ml-10 ">
  //               <label htmlFor="name block">Brand</label> <br />
  //               <input
  //                 type="text"
  //                 className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
  //                 value={brand}
  //                 onChange={(e) => setBrand(e.target.value)}
  //               />
  //             </div>
  //           </div>

  //           <label htmlFor="" className="my-5">
  //             Description
  //           </label>
  //           <textarea
  //             type="text"
  //             className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
  //             value={description}
  //             onChange={(e) => setDescription(e.target.value)}
  //           ></textarea>

  //           <div className="flex justify-between">
  //             <div>
  //               <label htmlFor="name block">Count In Stock</label> <br />
  //               <input
  //                 type="text"
  //                 className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
  //                 value={stock}
  //                 onChange={(e) => setStock(e.target.value)}
  //               />
  //             </div>

  //             <div>
  //               <label htmlFor="">Category</label> <br />
  //               <select
  //                 placeholder="Choose Category"
  //                 className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
  //                 onChange={(e) => setCategory(e.target.value)}
  //                 // initital value is empty string
  //                 value={category}
  //               >
  //                 <option value="">Choose Category</option>
  //                 {categories?.map((category) => (
  //                   <option key={category._id} value={category._id}>
  //                     {category.name}
  //                   </option>
  //                 ))}
  //               </select>
  //             </div>
  //           </div>

  //           <button
  //             onClick={handleSubmit}
  //             className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
  //           >
  //             Submit
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/4 px-4">
          <AdminMenu />
        </div>
        <div className="w-full md:w-3/4 px-4">
          <h2 className="text-xl font-bold mb-4">Create Product</h2>
          
          {imageUrl && (
            <div className="text-center mb-6">
              <img
                src={imageUrl}
                alt="product"
                className="mx-auto max-h-64 w-auto"
              />
            </div>
          )}

          <div className="mb-6">
            <button
              className="border text-white bg-blue-500 hover:bg-blue-700 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-2"
              onClick={openCloudinaryWidget}
            >
              Upload Image
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg bg-[#101011] text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block mb-2">Price</label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg bg-[#101011] text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block mb-2">Quantity</label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg bg-[#101011] text-white"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="brand" className="block mb-2">Brand</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg bg-[#101011] text-white"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-2">Description</label>
              <textarea
                className="w-full p-3 border rounded-lg bg-[#101011] text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="countInStock" className="block mb-2">Count In Stock</label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg bg-[#101011] text-white"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block mb-2">Category</label>
              <select
                className="w-full p-3 border rounded-lg bg-[#101011] text-white"
                placeholder="Choose Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
