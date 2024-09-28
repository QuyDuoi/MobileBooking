import { ipAddress } from "../../../services/api";

export const getListStore = async () => {
    try {
        const response = await fetch(`${ipAddress}getListStore`)
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log('Lỗi lấy danh sách cửa hàng: ', error);
        return [];
    }
}

export const getListEmplayee = async () => {
   
    try {
        const response = await fetch(`${ipAddress}getListEmployee`)
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log('Lỗi lấy danh sách cửa hàng: ', error);
        return [];
    }
}

export const getListService = async () => {
   
    try {
        const response = await fetch(`${ipAddress}getListService`)
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log('Lỗi lấy danh sách cửa hàng: ', error);
        return [];
    }
}


export const getListBooking = async (userId) => {
    try {
        const response = await fetch(`${ipAddress}getListBooking`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userId)
            }
        )
        const data = await response.json();
        return data.bookings;
    }
    catch (error) {
        console.log('Lỗi lấy danh sách lịch hẹn: ', error);
        return [];
    }
}

export const addBooking = async (boking) => {
    try {
        const response = await fetch(`${ipAddress}addBooking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(boking)
        })
        const data = await response.json();
        return true;
    }
    catch (error) {
        return false;
    }
}

export const deleteBooking = async (bookingId) => {
    try {
        const response = await fetch(`${ipAddress}deleteBooking/${bookingId}`, {
            method: 'DELETE',
        })
        const data = await response.json();

        return true;
    }
    catch (error) {
        console.log('Lỗi xóa lịch hẹn: ', error);
        return false;
    }
}

export const updateBookingApi = async (booking) => {
    try {
        const response = await fetch(`${ipAddress}updateBooking/${booking._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        const data = await response.json();
        return true;
    }
    catch (error) {
        console.log('Lỗi cập nhật trạng thái lịch hẹn: ', error);
        return false;
    }
}
