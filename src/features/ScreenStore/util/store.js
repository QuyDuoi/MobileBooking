import { api } from "./api";

export const getListStore = async()=>{
    try {
        console.log("Bắt đầu lấy dữ liệu Store")
        const response = await fetch('http://192.168.1.8:3000/api/getListStore');
        const data = await response.json();
        console.log("Lấy dữ liệu Store thành công")
        return data
    } catch (error) {
        console.log('lỗi khi lấy dữ liệu Store')
        console.log(error);
    }
}


export const addStore = async (formData) => {
    try {
        console.log("Bắt đầu thêm mới Store ");
        const response = await fetch(api.StoreAdd, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData,
        });
        const data = await response.json();
        console.log("Thêm mới Store thành công");
        return true;
    } catch (error) {
        console.log('Lỗi khi thêm mới Store');
        console.log(error);
        return false;
    }
}

export const UpdateStore = async(id, formData)=>{
    try {
        console.log("Bắt đầu cập nhật Store")
        const response = await fetch(`${api.StoreUpdate}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData,
        });
        const data = await response.json();
        console.log("Cập nhật Store thành công")
        return true
    } catch (error) {
        console.log('lỗi khi cập nhật Store')
        return false
        console.log(error);
    }
}

export const deleteStore = async(id)=>{
    try {
        console.log("Bắt đầu xóa Store")
        const response = await fetch(`${api.StoreDelete}/${id}`, {
            method: 'DELETE',
        });
        console.log("Xóa Store thành công")
        return true
    } catch (error) {
        console.log('lỗi khi xóa Store')
        console.log(error);
        return false
    }
}