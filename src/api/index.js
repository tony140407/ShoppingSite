import axios from 'axios';

// products相關的 api
const baseURL = axios.create({
  baseURL: `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}`,
});

// products 相關的 api
export const productsRequest = () => baseURL.get('/products');

export function promise(page) {
  return new Promise((resolve, reject) => {
    productsRequest
      .get(`?page=${page}`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// export const products = new Promise((resolve, reject) => {
//   productsRequest
//     .get(`?page=${page}`)
//     .then((response) => {
//       resolve(response);
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });
