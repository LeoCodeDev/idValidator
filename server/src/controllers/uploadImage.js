const axios = require("axios");

const uploadImage = async (req, res) => {
  const { files } = req;
  const { front_url, reverse_url, bothSides } = req.body;

  if (bothSides === "true" && files.length !== 2) {
    return res.status(400).json({ error: "Please upload two images" });
  }

  const [frontImage, reverseImage] = files;

  const headers = {
    ...axios.defaults.headers,
    "Content-Type": "binary",
  };

  try {
    await axios.put(front_url, frontImage.buffer, {
      headers,
    });
    if (bothSides === "true") {
      await axios.put(reverse_url, reverseImage.buffer, {
        headers,
      });
    }

    res.status(200).json({ message: "Images uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadImage,
};
