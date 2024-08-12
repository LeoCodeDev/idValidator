import { useEffect } from "react";
import { useValidationStore } from "../store/useValidationStore";

const WelcomeMessage = ({ handleNextStep }) => {
  const { reset } = useValidationStore();

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Document Validation App</h1>
        <p className="text-lg pb-4">
          To verify your document, please click on the button below to start.
        </p>
        <button
          onClick={handleNextStep}
          className="p-2 bg-blue-500 text-white rounded w-32"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export { WelcomeMessage };
