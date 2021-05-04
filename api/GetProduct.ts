import axios from 'axios';
import { ProductDetailModelType } from '../models/ProductModel';

export const GetProduct = async (
    token: number,
    search_query: string
) => {

  axios.defaults.headers.common = {
    "X-API-Key": token,
  };

  const result: ProductDetailModelType[] = await axios
    .get(
      `https://api.dev.goapp.co.id/v1/catalog/api/product/search/?q=${search_query}`,
    )
    .then(({ data }) => {
      console.log('Datatatat', data);
      return data.products;
    })
    .catch((error) => {
    });
  return result;
};
