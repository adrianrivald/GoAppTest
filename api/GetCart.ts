import axios from 'axios';

export const GetCart = async (
    token: number,
    tokenLogin: string,
) => {

  axios.defaults.headers.common = {
    "X-API-Key": token,
  };

  const config = {
    headers: {
      Authorization: `jwt ${tokenLogin}`,
    },
  };

  const result: any = await axios
    .get(
      `https://api.dev.goapp.co.id/v1/sales/api/cart/0/`, config
    )
    .then(({ data }) => {
      console.log('Datatatat', data);
      return data;
    })
    .catch((error) => {
        console.log(error,'error')
    });
  return result;
};
