import { api } from "./api";

export const getListServices = async () => {
    try {
        console.log("Bắt đầu lấy dữ liệu Service")
        const response = await fetch(api.seviceGetList);
        const response = await fetch(api.seviceGetList);
        const data = await response.json();
        console.log("Lấy dữ liệu Service thành công")
        return data
    } catch (error) {
        console.log('lỗi khi lấy dữ liệu Service')
        console.log(error);
    }
}
export const addService = async (service) => {
    try {
        console.log("Bắt đầu thêm mới Service ")
        const response = await fetch(api.seviceAdd, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(service),
        });
        const data = await response.json();
        console.log("Thêm mới Service thành công")
        return true
    } catch (error) {
        console.log('lỗi khi thêm mới Service')
        return false
    }
}

export const Updatesevice = async (id, service) => {
    try {
        console.log("Bắt đầu cập nhật Service")
        const response = await fetch(`${api.seviceUpdate}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(service),
        });
        const data = await response.json();
        console.log("Cập nhật service thành công")
        return true
    } catch (error) {
        console.log('lỗi khi cập nhật service')
        console.log(error);
        return false
    }
}

export const deleteSevice = async (id) => {
    try {
        console.log("Bắt đầu xóa Service")
        const response = await fetch(`${api.seviceDelete}/${id}`, {
            method: 'DELETE',
        });
        console.log("Xóa Service thành công")
        return true
    } catch (error) {
        console.log('lỗi khi xóa Service')
        console.log(error);
        return false
    }
}