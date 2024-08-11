import { useEffect } from "react";
import {useValidationStore} from "../store/useValidationStore";

const countryDocumentMap = {
    CL: {name: "Chile", document : ["national-id", "foreign-id", "driver-license", "passport"]},
    CO: {name: "Colombia", document :["national-id", "foreign-id", "driver-license", "passport", "identity-card", "rut", "ppt"]},
    MX: {name: "Mexico", document :["national-id", "foreign-id", "passport", "invoice", "picture-id", "record"]},
    PA: {name: "Panama", document :["national-id", "passport"]},
    PE: {name: "Peru", document :["national-id", "foreign-id", "passport"]},
    VE: {name: "Venezuela", document :["national-id", "passport"]},
    CR: {name: "Costa Rica", document :["national-id", "foreign-id", "passport"]},
    BR: {name: "Brasil", document :["cnh", "driver-license", "passport"]},
    ALL: {name: "All", document :["passport"]}
  };

const bothSidesAreNecessary = {
  "national-id": true,
  "foreign-id": true,
  "driver-license": false,
  "passport": false,
  "identity-card": true,
  "rut": false,
  "ppt": true,
  "invoice": false,
  "picture-id": false,
  "record": false,
  "cnh": false,
};

const ValidationForm = ({ onValidation, handlePreviousStep }) => {
  const { country, documentType, setCountry, setDocumentType, setBothSides } = useValidationStore();

  useEffect(() => {
    if (country && documentType) {
      let sides = bothSidesAreNecessary[documentType] || [];

      if(country === 'VE' || country === 'PA' || documentType === 'passport'){
        sides = false;
      }

      if (documentType === "passport") {
        setCountry('ALL')
      }

      setBothSides(sides);
    }
  }, [country, documentType])

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setDocumentType("");
  };

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
  };

  const handleSubmit = () => {
    onValidation(country, documentType);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Document Validation</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country:</label>
          <select id="country" value={country} onChange={handleCountryChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option value="" disabled>
              Select a country
            </option>
            {Object.keys(countryDocumentMap).map((countryCode) => (
              <option key={countryCode} value={countryCode}>
                {countryDocumentMap[countryCode].name}
              </option>
            ))}
          </select>
        </div>

        {country && (
          <div>
            <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">Document type:</label>
            <select
              id="documentType"
              value={documentType}
              onChange={handleDocumentTypeChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>
                Select document type
              </option>
              {countryDocumentMap[country].document.map((docType) => (
                <option key={docType} value={docType}>
                  {docType}
                </option>
              ))}
            </select>
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
        <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export { ValidationForm };
