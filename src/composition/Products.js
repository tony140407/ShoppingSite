import { reactive } from 'vue';
import axios from 'axios';
// import { promise } from '../api/index';

export function getProducts(page = 1) {
  return new Promise((resolve, reject) => {
    const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products?page=${page}`;
    let productsResult = reactive([]);
    let paginationResult = reactive({});

    axios
      .get(api)
      .then((response) => {
        productsResult = response.data.products;
        paginationResult = response.data.pagination;
        resolve({ productsResult, paginationResult });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function updateProduct() {
  // return new Promise((resolve, reject) => {
  //   let api =
  // `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`;
  //   let httpMethod = 'post';
  //   if (!isNew.value) {
  //     api = `${process.env.VUE_APP_API_PATH}
  // /api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${tempProduct.value.id}`;
  //     httpMethod = 'put';
  //   }
  //   axios[httpMethod](api, { data: tempProduct.value })
  //     .then((response) => {
  //       productsResult = response.data.products;
  //       paginationResult = response.data.pagination;
  //       resolve({ productsResult, paginationResult });
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
}
export function bootstrapModalProduct() {
  // return new Promise((resolve, reject) => {
  //   let api =
  // `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`;
  //   let httpMethod = 'post';
  //   if (!isNew.value) {
  //     api = `${process.env.VUE_APP_API_PATH}
  // /api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${tempProduct.value.id}`;
  //     httpMethod = 'put';
  //   }
  //   axios[httpMethod](api, { data: tempProduct.value })
  //     .then((response) => {
  //       productsResult = response.data.products;
  //       paginationResult = response.data.pagination;
  //       resolve({ productsResult, paginationResult });
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
}

// const productsStatusUpdate = (fn) => (page) => {
//   const products = ref([]);
//   const pagination = ref({});
//   fn(page).then((res) => {
//     const { productsResult, paginationResult } = res;
//     products.value = productsResult;
//     pagination.value = paginationResult;
//     console.log(products, pagination);
//     return { products, pagination };
//   });
// };
// export const getPageProductstest = productsStatusUpdate(getProducts);
