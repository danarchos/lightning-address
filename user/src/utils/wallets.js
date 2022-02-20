const axios = require("axios");

// Install user
const installWallet = async (username) => {
  try {
    const newWallet = await axios.post(
      `${process.env.LN_API_BASE}/api/createWallet`,
      { username }
    );
    return newWallet;
  } catch (err) {
    console.log(err);
  }
};

exports.installWallet = installWallet;
