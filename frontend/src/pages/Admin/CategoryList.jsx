import { useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import {toast} from "react-hot-toast";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [updatingImage, setUpdatingImage] = useState("");

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data: categories, refetch } = useGetCategoriesQuery();



  useEffect(() => {
    if (selectedCategory) {
      setUpdatingName(selectedCategory.name);
      setUpdatingImage(selectedCategory.image);
    }
  }, [selectedCategory]);

  console.log(categories);

  console.log("Image", image )

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
        toast.error("Category name is required");
        return;
    }
    if(!image){
        toast.error("Category image is required");
        return;
    }
    try {
      const result = await createCategory({ name, image }).unwrap();
      if(result.error){
        toast.error(result.error);
      }else{
        setName("");
        setImage("");
        
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
      
       

        try {
            const result = await updateCategory({
                id: selectedCategory._id,
                category: { name: updatingName, 
                    image: updatingImage
                },
            }).unwrap();
            if (result.error) {
                toast.error(result.error);
            } else {
                setModalVisible(false);
                setImage("");
                setUpdatingImage("");
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
            console.log(result);
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
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
          setImage={setImage}
          image={image}

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
            handleDelete={handleDeleteCategory}
            updatingImage={updatingImage}
            setImage={setUpdatingImage}
            


          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
