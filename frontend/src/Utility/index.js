import axios from "axios";

export const saveAndUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `https://etuitionbd-zeta.vercel.app/user`,
    userData,
  );
  return data;
};
