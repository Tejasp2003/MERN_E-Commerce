import { useState } from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import {toast} from "react-hot-toast";
import Modal from "../../components/Modal";

const CategoryList = () => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data: categories, refetch } = useGetCategoriesQuery();

  console.log(categories);


  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
        toast.error("Category name is required");
        return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      if(result.error){
        toast.error(result.error);
      }else{
        setName("");
        refetch();
        toast.success(`Category ${result.name} created`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!updatingName) {
            toast.error("Category name is required");
            return;
        }
        try {
            const result = await updateCategory({
                id: selectedCategory._id,
                category: { name: updatingName },
            }).unwrap();
            if (result.error) {
                toast.error(result.error);
            } else {
                setModalVisible(false);
                refetch();
                toast.success(`Category ${result.name} updated`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const handleDeleteCategory = async (e) => {
        e.preventDefault();
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap();
            if (result.error) {
                toast.error(result.error);
            } else {
                setModalVisible(false);
                refetch();
                toast.success(`Category ${result.name} deleted`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }




  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      {/* <AdminMenu /> */}
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
