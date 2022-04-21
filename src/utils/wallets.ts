import axios from "axios"

// Install user
export const installWallet = async (username: string) => {
  try {
    const newWallet = await axios.post(
      `${process.env.LN_API_BASE}/api/createWallet`,
      { username }
    );
    console.log({ newWallet });
    return newWallet;
  } catch (err) {
    console.log(err);
  }
};


