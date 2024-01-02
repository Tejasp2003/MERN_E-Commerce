import { useEffect } from "react";
import { toast } from "react-hot-toast";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
  setImage,
  updatingImage,
}) => {
  const openCloudinaryWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dh8gfmbp2",
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

          setImage(result.info.secure_url);
          toast.success("Image uploaded successfully");
        } else if (error) {
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

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="hidden" value={value} />
        <div className="flex justify-between">
          {updatingImage && (
            <img
              src={updatingImage}
              alt="category"
              className="w-20 h-20 rounded-full object-cover"
            />
          )}

          <input
            type="hidden"
            value={updatingImage}
            onChange={(e) => setImage(e.target.value)}
          />

          <button
            type="button"
            className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50"
            onClick={openCloudinaryWidget}
          >
            Upload
          </button>
        </div>
        <hr />

        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between">
          <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
