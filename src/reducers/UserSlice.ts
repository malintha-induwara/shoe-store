import User from "../models/User";
import { createSlice } from "@reduxjs/toolkit";

const initialState: User[] = [
    { email: 'admin1@example.com', password: 'password123', role: 'Admin' },
    { email: 'manager1@example.com', password: 'securepass456', role: 'Manager' },
    { email: 'sales1@example.com', password: 'salesrule789', role: 'Sales' },
    { email: 'inventory1@example.com', password: 'inventoryking101', role: 'Inventory' },
    { email: 'admin2@example.com', password: 'admindev098', role: 'Admin' },
    { email: 'manager2@example.com', password: 'managerplus321', role: 'Manager' },
    { email: 'sales2@example.com', password: 'sellingpro654', role: 'Sales' },
    { email: 'inventory2@example.com', password: 'stockboss555', role: 'Inventory' },
];

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        },
        updateUser: (state, action) => {
            const index = state.findIndex(user => user.email === action.payload.email);
            state[index] = action.payload;
        },
        deleteUser: (state, action) => {
            return state.filter(user => user.email !== action.payload.email);
        }
    }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
