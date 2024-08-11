import { useState } from "react";
import axios from "axios";
import { useValidationStore } from "../store/useValidationStore";

const UploadImages = ({ handleNextStep, handlePreviousStep }) => {
  const { validationData, bothSides } = useValidationStore();
  const [frontImage, setFrontImage] = useState(null);
  const [reverseImage, setReverseImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async () => {
    if (!frontImage || (bothSides && !reverseImage)) {
      alert("Please upload the required images.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("images", frontImage);
    formData.append("front_url", validationData.front_url);
    formData.append("bothSides", bothSides);
    if (bothSides) {
      formData.append("images", reverseImage);
      formData.append("reverse_url", validationData.reverse_url);
    }

    try {
      await axios.post("/uploadImage", formData);

      setUploading(false);
      handleNextStep();

    } catch (error) {

      console.error("Error uploading images:", error);
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Upload Images
      </h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="frontImage" className="block text-sm font-medium text-gray-700">
            Upload front image:
          </label>
          <input
            id="frontImage"
            type="file"
            accept="image/*"
            onChange={(e) => setFrontImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        {bothSides && (
          <div>
            <label htmlFor="reverseImage" className="block text-sm font-medium text-gray-700">
              Upload back image:
            </label>
            <input
              id="reverseImage"
              type="file"
              accept="image/*"
              onChange={(e) => setReverseImage(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        )}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousStep}
          className="p-2 bg-blue-500 text-white rounded w-32"
        >
          Back
        </button>
        <button
          onClick={handleImageUpload}
          disabled={uploading}
          className={`p-2 bg-blue-500 text-white rounded ${
            uploading ? "opacity-50" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export { UploadImages };
