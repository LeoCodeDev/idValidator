import { create } from "zustand";
import { persist } from "zustand/middleware";

const useValidationStore = create(
  persist(
    (set) => ({
      country: "",
      documentType: "",
      bothSides: null,
      validationData: null,
      setCountry: (country) => set({ country }),
      setDocumentType: (documentType) => set({ documentType }),
      setBothSides: (bothSides) => set({ bothSides }),
      setValidationData: (validationData) => set({ validationData }),
      reset: () =>
        set({
          country: "",
          documentType: "",
          bothSides: null,
          validationData: null,
        }),
    }),
    {
      name: "validation-store",
      getStorage: () => localStorage,
    }
  )
);

export { useValidationStore };
