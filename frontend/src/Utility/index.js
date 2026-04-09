import axios from "axios";

export const saveAndUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `https://etuitionbd-fawn.vercel.app/user`,
    userData,
  );
  return data;
};
