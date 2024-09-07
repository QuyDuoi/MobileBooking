import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getListEmployee, addEmployee } from '../services/api'

export interface Employee {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
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

export const addNewEmployee = createAsyncThunk('employees/addEmployee', async (employee: Employee, thunkAPI) => {
    try {
      const data = await addEmployee(employee);
      return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Error adding employee');
    }
  })

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
                state.employees.push(action.payload); // Thêm nhân viên mới vào danh sách
                state.status = 'succeeded';
              })
            .addCase(addNewEmployee.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Error adding employee';
            });
    },
});

export default employeeSlice.reducer;
