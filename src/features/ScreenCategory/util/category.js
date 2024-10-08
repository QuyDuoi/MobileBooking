import { api } from "./api";

export const getListCategorys = async()=>{
    try {
        console.log("Bắt đầu lấy dữ liệu Category")
        const response = await fetch(api.categoryGetList);
        const data = await response.json();
        console.log("Lấy dữ liệu Category thành công")
        return data
    } catch (error) {
        console.log('lỗi khi lấy dữ liệu category')
        console.log(error);
    }
}
export const addCategory = async(category)=>{
    try {
        console.log("Bắt đầu thêm mới Category")
        console.log(category);
        const response = await fetch(api.categoryAdd, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 'Accept': 'application/json'
            },
            body: JSON.stringify(category),
        });
        const data = await response.json();
        console.log("Thêm mới Category thành công")
        return data;
    } catch (error) {
        console.log('lỗi khi thêm mới category')
        console.log(error);
        return false
    }
}

export const updateCategory = async(id, category)=>{
    try {
        console.log("Bắt đầu cập nhật Category")
        const response = await fetch(`${api.categoryUpdate}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });
        const data = await response.json();
        console.log("Cập nhật Category thành công")
        return data;
    } catch (error) {
        console.log('lỗi khi cập nhật category')
        console.log(error);
        return false
    }
}

export const deleteCategory = async(id)=>{
    try {
        console.log("Bắt đầu xóa Category")
        const response = await fetch(`${api.categoryDelete}/${id}`, {
            method: 'DELETE',
        });
        console.log("Xóa Category thành công")
        if (response.ok){
            return true;
        } else {
            console.log("Lỗi xóa cửa hàng!");
        }
    } catch (error) {
        console.log('lỗi khi xóa category')
        console.log(error);
        return false
    }
}