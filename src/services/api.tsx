const ipAddress = 'http://192.168.1.27:3000/api/';

export const addEmployee = async (employee) => {
  try {
    const response = await fetch(`${ipAddress}addEmployee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(employee),
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

export const updateEmployee = async (id, employee) => {
  try {
    const response = await fetch(`${ipAddress}updateEmployee/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(employee),
    });

    // Kiểm tra phản hồi từ server
    if (!response.ok) {
      throw new Error('Cập nhật không thành công');
    }

    const data = await response.json();
    console.log('Cập nhật nhân viên thành công');
    return data;
  } catch (error) {
    console.log('Lỗi cập nhật: ', error); // Log lỗi
    return false; // Vẫn trả về false nếu có lỗi
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
