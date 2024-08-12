import { useState } from "react";
import axios from "axios";
import { WelcomeMessage } from "./components/WelcomeMessage";
import { ValidationForm } from "./components/ValidationForm";
import { UploadImages } from "./components/UploadImages";
import { useValidationStore } from "./store/useValidationStore";
import { CheckVerification } from "./components/CheckVerification";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const { setValidationData, validationData, reset } = useValidationStore();
  const [currentStep, setCurrentStep] = useState(0);

  const handleValidation = async (country, documentType) => {
    try {
      const response = await axios.post("/createValidation", {
        country,
        document_type: documentType,
      });

      setValidationData({
        validation_id: response.data.validation_id,
        front_url: response.data.front_url,
        reverse_url: response.data.reverse_url,
      });

      setCurrentStep(2);
    } catch (error) {
      console.error("Error creando la validación:", error);
    }
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    reset();
    setCurrentStep(0);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {currentStep === 0 && <WelcomeMessage handleNextStep={handleNextStep} />}
      {currentStep === 1 && (
        <ValidationForm
          onValidation={handleValidation}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {currentStep === 2 && validationData && (
        <UploadImages
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {currentStep === 3 && (
        <CheckVerification
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
          handleReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
