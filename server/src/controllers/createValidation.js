const axios = require("axios");

const createValidation = async (req, res) => {
  const { country, document_type } = req.body;

  try {
    const response = await axios.post("/validations", {
      country,
      document_type,
      type: "document-validation",
      user_authorized: true,
    });

    const { validation_id } = response.data;
    const { front_url, reverse_url } = response.data.instructions;

    const validationData = {
      validation_id,
      front_url,
      reverse_url,
    };

    return res.status(200).json(validationData);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

module.exports = {
  createValidation,
};
