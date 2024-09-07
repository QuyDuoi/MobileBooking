import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getListStore } from '../services/api';

// Định nghĩa Store interface
export interface Store {
    name: string;
    address: string;
    location: string;
    phoneNumber?: string;
    image?: string;
}

// Định nghĩa StoreState interface
export interface StoreState {
    stores: Store[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Trạng thái ban đầu cho storeSlice
const initialState: StoreState = {
    stores: [],
    status: 'idle',
    error: null,
};

// Thunk để fetch danh sách cửa hàng
export const fetchStores = createAsyncThunk('stores/fetchStores', async () => {
    const data = await getListStore(); // Gọi hàm getListStore từ API
    return data; // Trả về dữ liệu
});

// Tạo storeSlice
const storeSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        // Các reducers tùy chỉnh
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStores.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStores.fulfilled, (state, action: PayloadAction<Store[]>) => {
                state.status = 'succeeded';
                state.stores = action.payload; // Cập nhật danh sách store khi fetch thành công
            })
            .addCase(fetchStores.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Could not fetch stores'; // Lỗi khi fetch thất bại
            });
    },
});

// Export reducer để sử dụng trong store
export default storeSlice.reducer;
