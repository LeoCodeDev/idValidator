import { useEffect, useState } from "react";
import axios from "axios";
import { useValidationStore } from "../store/useValidationStore";

const CheckVerification = ({ handlePreviousStep, handleReset }) => {
  const [timer, setTimer] = useState(10);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [data, setData] = useState(null);
  const { validationData } = useValidationStore();

  const handleStartOver = () => {
    handleReset();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setIsButtonDisabled(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const checkVerification = async () => {
    try {
      const response = await axios.get(
        `/getValidation/${validationData.validation_id}`
      );
      console.log("Verification status:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error checking verification:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Identity Validation
        </h2>
        {data?.details ? (
          <div className="space-y-3">
            <p>
              <span className="font-semibold text-gray-700">
                Validation Status:
              </span>{" "}
              {data.validation_status}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Name:</span>{" "}
              {data.details.document_details.name}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Last Name:</span>{" "}
              {data.details.document_details.last_name}
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Document Type:
              </span>{" "}
              {data.details.document_details.document_type}
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Document Number:
              </span>{" "}
              {data.details.document_details.document_number}
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Date of Birth:
              </span>{" "}
              {new Date(
                data.details.document_details.date_of_birth
              ).toLocaleDateString("es-ES", {timeZone: "UTC"})}
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Expiration Date:
              </span>{" "}
              {new Date(
                data.details.document_details.expiration_date
              ).toLocaleDateString("es-ES", {timeZone: "UTC"})}
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Validation ID:
              </span>{" "}
              {data.validation_id}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Account ID:</span>{" "}
              {data.account_id}
            </p>
            <button
              onClick={handleStartOver}
              disabled={timer > 0}
              className={`p-2 bg-blue-500 text-white rounded w-full ${
                timer > 0 ? "opacity-50" : ""
              }`}
            >
              {timer > 0 ? `Start Over (${timer})` : "Start Over"}
            </button>
          </div>
        ) : (
          <>
            <p className="text-lg text-gray-700 mb-4">Timer: {timer}</p>
            <button
              onClick={checkVerification}
              disabled={isButtonDisabled}
              className={`w-full py-2 mb-3 px-4 text-white rounded ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Check Verification
            </button>
            <button
              onClick={handlePreviousStep}
              className="p-2 bg-blue-500 text-white rounded w-full "
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export { CheckVerification };
