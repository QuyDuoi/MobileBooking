import { ipAddress } from "../../services/api";

// Interface cho các đối tượng trong hóa đơn
interface Product {
  productId: string;
  quantity: number;
}

interface Service {
  serviceId: string;
}

export interface Invoice {
  _id: string;
  customerName: string;
  phoneNumber: string;
  products: Product[];
  services: Service[];
  totalAmount: number;
  paymentMethod: 'cash' | 'credit' | 'bank_transfer';
  paymentStatus: 'paid' | 'unpaid';
  id_store: string;
  createdAt?: string;
  updatedAt?: string;
}

// Thêm mới hóa đơn
export const addInvoice = async (invoiceData: Invoice): Promise<Invoice | false> => {
  try {
    const response = await fetch(`${ipAddress}addInvoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(invoiceData),
    });

    if (!response.ok) {
      throw new Error('Thêm mới hóa đơn không thành công');
    }

    const data = await response.json();
    console.log('Thêm mới hóa đơn thành công');
    return data;
  } catch (error) {
    console.error('Lỗi thêm mới hóa đơn: ', error);
    return false;
  }
};

// Cập nhật hóa đơn
export const updateInvoice = async (id: string, invoiceData: Invoice): Promise<Invoice | false> => {
  try {
    const response = await fetch(`${ipAddress}updateInvoice/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(invoiceData),
    });

    if (!response.ok) {
      throw new Error('Cập nhật hóa đơn không thành công');
    }

    const data = await response.json();
    console.log('Cập nhật hóa đơn thành công');
    return data;
  } catch (error) {
    console.error('Lỗi cập nhật hóa đơn: ', error);
    return false;
  }
};

// Xóa hóa đơn
export const deleteInvoice = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${ipAddress}deleteInvoice/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Xóa hóa đơn không thành công');
    }

    console.log('Xóa hóa đơn thành công');
    return true;
  } catch (error) {
    console.error('Lỗi xóa hóa đơn: ', error);
    return false;
  }
};

// Lấy danh sách hóa đơn
export const getListInvoice = async (): Promise<Invoice[]> => {
    try {
        // Sử dụng phương thức GET thay vì POST
        const response = await fetch(`${ipAddress}getListInvoice`, {
        method: 'GET', // Đổi thành GET
        headers: {
            Accept: 'application/json',
        },
        });

        if (!response.ok) {
        throw new Error('Lỗi khi lấy danh sách hóa đơn');
        }

        const data = await response.json();
        console.log('Lấy danh sách hóa đơn thành công');
        return data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách hóa đơn: ', error);
        return [];
    }
};
  