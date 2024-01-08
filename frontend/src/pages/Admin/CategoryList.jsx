import React from "react";
import { useGetTotalProductsByCategoryQuery } from "../../redux/api/categoryApiSlice";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

const CategoryList = () => {
  const handleUpdateClick = (product) => {
    // Add your logic for handling the update action
    console.log(`Update clicked for product: ${product.name}`);
    handleUpdate(product);
  };

  const handleDeleteClick = (productId) => {
    // Add your logic for handling the delete action
    console.log(`Delete clicked for product with ID: ${productId}`);
    handleDelete(productId);
  };

  const handleAddCategoryClick = () => {
    // Add your logic for handling the add action
    console.log(`Add clicked`);
    handleAdd();
  };

  const { data: totalProducts } = useGetTotalProductsByCategoryQuery();

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-2 p-4">
        <h1 className="text-2xl font-semibold text-gray-700">Categories</h1>
        <button
          onClick={handleAddCategoryClick}
          className="flex items-center p-2 bg-rose-500 font-semibold text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          <AiOutlinePlus className="mr-2" />
          Add New Category
        </button>
      </div>
      <div className="flex justify-between items-center mb-4 p-4">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Sr. No</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">
                Category Name
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Total Products
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {totalProducts &&
              totalProducts.map((product, index) => (
                <tr key={product._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-full text-center mx-auto border-2 border-gray-200"
                    />
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {product.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.totalProducts}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 flex justify-center items-center flex-row gap-4 ">
                    <button
                      onClick={() => handleUpdateClick(product)}
                      className="flex items-center p-2 bg-blue-500 font-semibold text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      <AiOutlineEdit className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product._id)}
                      className="flex items-center p-2 bg-red-500 font-semibold text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                      <AiOutlineDelete className="mr-2" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
