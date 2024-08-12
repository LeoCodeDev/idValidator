const axios = require("axios");

const getValidation = async (req, res) => {
  const { validation_id } = req.params;
  console.log(req.params);

  if (!validation_id) {
    return res.status(400).json({ error: "Please provide a validation ID" });
  }

  try {
    const response = await axios(`/validations/${validation_id}`);

    if (response.status === 200) {
      return res.status(200).json(response.data);
    }

    return res.status(response.status).json({ error: response.data.message });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getValidation,
};
