import axios from 'axios';

export const GetNameAndLogo = async (
    token: number
) => {

  axios.defaults.headers.common = {
    "X-API-Key": token,
  };

  const result: any = await axios
    .get(
      `${process.env.API_URL}/directory/api/business/0/`,
    )
    .then(({ data }) => {
      console.log('Datatatat', data);
      return data;
    })
    .catch((error) => {
    });
  return result;
};
