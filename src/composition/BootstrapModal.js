import * as Bootstrap from 'bootstrap';
import { onMounted } from 'vue';

export function createModal(modifyProductRef, deleteProductRef) {
  // let modifyModal = null; // onMounted 後元素才掛載
  // let deleteModal = null; // onMounted 後元素才掛載
  onMounted(() => {
    const modifyModal = new Bootstrap.Modal(modifyProductRef.value, {});
    const deleteModal = new Bootstrap.Modal(deleteProductRef.value, {});
    console.log('Modal 創建');
    return { modifyModal, deleteModal };
  });
}
export function test() {}
