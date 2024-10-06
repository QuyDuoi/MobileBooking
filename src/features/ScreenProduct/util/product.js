import { api } from './api';

export const getListProduct = async () => {
  try {
    console.log('Bắt đầu lấy dữ liệu Product');
    const response = await fetch(api.GetList_Product);
    const data = await response.json();
    console.log('Lấy dữ liệu Product thành công');
    return data;
  } catch (error) {
    console.log('lỗi khi lấy dữ liệu Product');
    console.log(error);
  }
};
export const addProduct = async product => {
  try {
    const response = await fetch(api.Add_Product, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: product,
    });
    const data = await response.json();
    console.log('Thêm mới Product thành công');
    return true;
  } catch (error) {
    console.log('lỗi khi thêm mới Product');
    return false;
  }
};

export const UpdateProduct = async (id, product) => {
  try {
    const response = await fetch(`${api.Update_Product}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: product,
    });
    const data = await response.json();
    console.log('Cập nhật Product thành công');
    return true;
  } catch (error) {
    console.log('lỗi khi cập nhật Product');
    console.log(error);
    return false;
  }
};

export const deleteProduct = async id => {
  try {
    const response = await fetch(`${api.Delete_Product}/${id}`, {
      method: 'DELETE',
    });
    console.log('Xóa Product thành công');
    return true;
  } catch (error) {
    console.log('lỗi khi xóa Product');
    console.log(error);
    return false;
  }
};
