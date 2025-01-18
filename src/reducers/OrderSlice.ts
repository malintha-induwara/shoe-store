import { createSlice } from "@reduxjs/toolkit";
import Orders from "../models/Orders";

const initialState:Orders[] = [
    {
      id: 1,
      orderDate: new Date("2025-01-01"),
      customerId: 1,
      totalAmount: 240,
      orderItems: [
        { itemId: 1, quantity: 2 },
        { itemId: 2, quantity: 1 },
      ],
    },
    {
      id: 2,
      orderDate: new Date("2025-01-02"),
      customerId: 2,
      totalAmount: 340,
      orderItems: [
        { itemId: 3, quantity: 2 },
        { itemId: 6, quantity: 1 },
      ],
    },
    {
      id: 3,
      orderDate: new Date("2025-01-03"),
      customerId: 3,
      totalAmount: 300,
      orderItems: [
        { itemId: 4, quantity: 5 },
      ],
    },
    {
      id: 4,
      orderDate: new Date("2025-01-04"),
      customerId: 4,
      totalAmount: 260,
      orderItems: [
        { itemId: 5, quantity: 2 },
        { itemId: 8, quantity: 1 },
      ],
    },
    {
      id: 5,
      orderDate: new Date("2025-01-05"),
      customerId: 5,
      totalAmount: 150,
      orderItems: [
        { itemId: 1, quantity: 1 },
        { itemId: 7, quantity: 1 },
      ],
    },
    {
      id: 6,
      orderDate: new Date("2025-01-06"),
      customerId: 6,
      totalAmount: 110,
      orderItems: [
        { itemId: 6, quantity: 1 },
      ],
    },
    {
      id: 7,
      orderDate: new Date("2025-01-07"),
      customerId: 7,
      totalAmount: 325,
      orderItems: [
        { itemId: 2, quantity: 2 },
        { itemId: 4, quantity: 1 },
      ],
    },
    {
      id: 8,
      orderDate: new Date("2025-01-08"),
      customerId: 8,
      totalAmount: 390,
      orderItems: [
        { itemId: 8, quantity: 3 },
      ],
    },
  ];


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.push(action.payload);
        },
        updateOrder: (state, action) => {
            const index = state.findIndex(order => order.id === action.payload.id);
            state[index] = action.payload;
        },
        deleteOrder: (state, action) => {
            return state.filter(order => order.id !== action.payload.id);
        }
    }
});

export const { addOrder, updateOrder, deleteOrder } = orderSlice.actions;

export default orderSlice.reducer;


