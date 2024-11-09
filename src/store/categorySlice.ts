import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getListCategorys, addCategory, updateCategory, deleteCategory } from '../features/ScreenCategory/util/category';

// Thunk để lấy danh sách category
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (id_store) => {
    const data = await getListCategorys(id_store);
    return data;
  }
);

// Thunk để thêm category mới
export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (category) => {
    console.log(category);
    
    const data = await addCategory(category);
    return data;
  }
);

// Thunk để cập nhật category
export const modifyCategory = createAsyncThunk(
  'category/modifyCategory',
  async ({ id, category }, thunkAPI) => {
    const data = await updateCategory(id, category);
    return data;
  }
);

// Thunk để xóa category
export const removeCategory = createAsyncThunk(
  'category/removeCategory',
  async (id, thunkAPI) => {
    const isSuccess = await deleteCategory(id);
    return isSuccess ? id : thunkAPI.rejectWithValue('Failed to delete category');
  }
);

// Tạo categorySlice
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Xử lý createCategory
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Xử lý modifyCategory
      .addCase(modifyCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(modifyCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((cat) => cat._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(modifyCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Xử lý removeCategory
      .addCase(removeCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((cat) => cat._id !== action.payload);
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
