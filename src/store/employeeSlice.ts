import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getListEmployee, addEmployee, updateEmployee } from '../services/api'

export interface Employee {
    _id?: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
    userRole?: string;
    image?: string;
    id_store?: string;
}

export interface EmployeeState {
    employees: Employee[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: EmployeeState = {
    employees: [],
    status: 'idle',
    error: null,
};

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const data = await getListEmployee(); // Gọi hàm getListEmployee
    return data; // Trả về dữ liệu
});

export const addNewEmployee = createAsyncThunk('employees/addEmployee', async (formData: FormData, thunkAPI) => {
    try {
      const data = await addEmployee(formData);
      return data;
    } catch (error) {
        console.log('Lỗi thêm mới:', error);
        return thunkAPI.rejectWithValue(error.message || 'Error adding employee');
    }
  });

export const updateEmployeeThunk = createAsyncThunk(
    'employees/updateEmployee', 
    async ({ id, formData }: { id: string, formData: FormData }, thunkAPI) => {
        try {
        const data = await updateEmployee(id, formData); // Gọi hàm updateEmployee từ API
        return data;
        } catch (error) {
        console.log('Lỗi cập nhật: ', error);
        return thunkAPI.rejectWithValue(error.message || 'Error updating employee');
        }
    }
);

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        // Reducers tùy chỉnh
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
                state.status = 'succeeded';
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Could not fetch employees';
            })
            .addCase(addNewEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
                state.employees.unshift(action.payload); // Thêm nhân viên mới vào danh sách
                state.status = 'succeeded';
              })
            .addCase(addNewEmployee.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Error adding employee';
            })
            .addCase(updateEmployeeThunk.fulfilled, (state, action: PayloadAction<Employee>) => {
                const index = state.employees.findIndex(emp => emp._id === action.payload._id);
                if (index !== -1) {
                    state.employees[index] = action.payload; // Cập nhật thông tin nhân viên trong danh sách
                }
                state.status = 'succeeded';
            })
            .addCase(updateEmployeeThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Error updating employee';
            });
    },
});

export default employeeSlice.reducer;
