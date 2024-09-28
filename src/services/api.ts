import { Employee } from "../store/employeeSlice";

export const IPV4 = '192.168.1.10';

export const ipAddress = `http://${IPV4}:3000/api/`;

export const addEmployee = async (formData: FormData) => {
  try {
    const response = await fetch(`${ipAddress}addEmployee`, {
      method: 'POST',
      body: formData,
    });

    // Kiểm tra phản hồi từ server
    if (!response.ok) {
      throw new Error('Thêm mới không thành công');
    }

    const data = await response.json();
    console.log('Thêm mới nhân viên thành công');
    return data;
  } catch (error) {
    console.log('Lỗi thêm mới: ', error); // Log lỗi
    return false; // Vẫn trả về false nếu có lỗi
  }
};

export const updateEmployee = async (id: string, formData: FormData) => {
  try {
    const response = await fetch(`${ipAddress}updateEmployee/${id}`, {
      method: 'PUT',
      body: formData, // Sử dụng FormData để gửi dữ liệu
    });

    if (!response.ok) {
      throw new Error('Cập nhật không thành công');
    }

    const data = await response.json();
    console.log('Cập nhật nhân viên thành công');
    return data;
  } catch (error) {
    console.log('Lỗi cập nhật: ', error);
    return false;
  }
};

export const getListEmployee = async () => {
  try {
    const response = await fetch(`${ipAddress}getListEmployee`); // Sửa đường dẫn
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách');
    }
    const data = await response.json();
    console.log('Lấy danh sách nhân viên thành công');
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách: ', error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};

export const getListStore = async () => {
  try {
    const response = await fetch(`${ipAddress}getListStore`); // Sửa đường dẫn
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách');
    }
    const data = await response.json();
    console.log('Lấy danh sách cửa hàng thành công');
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách: ', error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};

export const login = async (email: string, password: string): Promise<{status: number, token: string, refreshToken: string, data: Employee}> => {
  try {
    const response = await fetch(`${ipAddress}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Đăng nhập không thành công');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi đăng nhập: ', error);
    throw error;
  }
};