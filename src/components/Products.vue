<template>
  <!-- <loading v-model:active="isLoading"></loading> -->
  <div class="text-right mt-4">
    <button class="btn btn-primary" @click="openModal('modify', {}, true)">
      建立新產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="180">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">
          {{ $filters.currency(item.origin_price) }}
        </td>
        <td class="text-right">
          {{ $filters.currency(item.price) }}
        </td>
        <td>
          <span v-if="item.is_enabled" class="text-success"></span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <button
            class="btn btn-outline-primary btn-sm mr-2"
            @click="openModal('modify', item, false)"
          >
            編輯
          </button>
          <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
            刪除
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pagination="pagination" @get-products="getPageProducts" />
  <div
    class="modal fade"
    ref="modifyProductRef"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="image">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl"
                />
              </div>
              <div class="form-group">
                <label for="customFile"
                  >或 上傳圖片
                  <font-awesome-icon icon="spinner" spin v-if="status.fileUploading" />
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="filesRef"
                  @change="uploadFile"
                />
              </div>
              <img
                img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                class="img-fluid"
                alt=""
                :src="tempProduct.imageUrl"
              />
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    placeholder="請輸入分類"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <input
                    type="unit"
                    class="form-control"
                    id="unit"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    placeholder="請輸入原價"
                    v-model="tempProduct.origin_price"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    placeholder="請輸入售價"
                    v-model="tempProduct.price"
                  />
                </div>
              </div>
              <hr />

              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea
                  class="form-control"
                  id="description"
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea
                  class="form-control"
                  id="content"
                  placeholder="請輸入產品說明內容"
                  v-model="tempProduct.content"
                ></textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_enabled"
                    v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    ref="deleteProductRef"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import * as Bootstrap from 'bootstrap';

import Pagination from '@/components/Pagination.vue';
import bus from '../utils/bus';
import { getProducts } from '../composition/Products';
// import { createModal } from '../composition/BootstrapModal';

export default {
  components: { Pagination },
  setup() {
    const isLoading = false;
    const status = reactive({
      fileUploading: false,
    });

    // products 頁面更新
    const products = ref([]);
    const pagination = ref({});

    const productsStatusUpdate = (fn) => (page) => {
      fn(page).then((res) => {
        const { productsResult, paginationResult } = res;
        products.value = productsResult;
        pagination.value = paginationResult;
      });
    };
    const getPageProducts = productsStatusUpdate(getProducts);

    getPageProducts(1);

    // Bootstrap.Modal 掛載
    const modifyProductRef = ref(); // modifyProduct 必須跟元素上的 ref 同名
    const deleteProductRef = ref();
    let modifyModal = null; // onMounted 後元素才掛載
    let deleteModal = null; // onMounted 後元素才掛載
    // ({ modifyModal, deleteModal } = createModal(modifyProductRef, deleteProductRef));
    onMounted(() => {
      modifyModal = new Bootstrap.Modal(modifyProductRef.value, {});
      deleteModal = new Bootstrap.Modal(deleteProductRef.value, {});
    });
    const isNew = ref(''); // 是否現存資料
    const tempProduct = ref({}); // 放空物件或 product 個別資料

    function openModal(mode, item, productIsNew) {
      if (mode === 'modify') {
        if (productIsNew) {
          tempProduct.value = {};
          isNew.value = true;
        } else {
          tempProduct.value = { ...item }; // item 深層拷貝 Object.assign({},item)
          isNew.value = false;
        }
        modifyModal.show();
      } else {
        tempProduct.value = item; // item 淺層拷貝即可，因為不會修改到
        deleteModal.show();
      }
    }

    function updateProduct() {
      let api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`;
      let httpMethod = 'post';
      if (!isNew.value) {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${tempProduct.value.id}`;
        httpMethod = 'put';
      }
      axios[httpMethod](api, { data: tempProduct.value }).then((response) => {
        if (response.data.success) {
          getPageProducts(1);
          modifyModal.hide();
          return;
        }
        getPageProducts(1);
        // eslint-disable-next-line
        alert('新增失敗');
      });
    }
    function deleteProduct() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${tempProduct.value.id}`;
      const httpMethod = 'delete';

      axios[httpMethod](api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          productsStatusUpdate(getProducts)();
          deleteModal.hide();
          return;
        }
        productsStatusUpdate(getProducts)();
        deleteModal.hide();
        // eslint-disable-next-line
        alert('刪除失敗');
      });
    }

    const filesRef = ref();
    function uploadFile() {
      status.fileUploading = true;
      const uploadedFile = filesRef.value.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`;
      axios
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.data.success) {
            tempProduct.value.imageUrl = response.data.imageUrl;
          } else {
            bus.emit('message:push', response.data.message, 'danger');
          }

          status.fileUploading = false;
        });
    }
    bus.emit('message:push', 'bus color 待解決', 'success');
    bus.emit('message:push', '模擬訂單?????', 'success');
    bus.emit('message:push', 'Loading 還沒解決!!', 'success');
    return {
      isLoading,
      status,
      products,
      pagination,
      getPageProducts,
      modifyProductRef,
      deleteProductRef,
      filesRef,
      openModal,
      tempProduct,
      updateProduct,
      deleteProduct,
      uploadFile,
    };
  },
};
</script>
<style scoped></style>
