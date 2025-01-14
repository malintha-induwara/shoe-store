import Staff from "../models/Staff";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Staff[] = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "123-456-7890",
    address: "123 Elm Street, Springfield, IL",
    role: "Admin",
    hireDate: new Date("2022-01-15"),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    mobile: "987-654-3210",
    address: "456 Maple Avenue, Austin, TX",
    role: "Manager",
    hireDate: new Date("2023-03-10"),
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alicej@example.com",
    mobile: "555-666-7777",
    address: "789 Oak Lane, Denver, CO",
    role: "Sales",
    hireDate: new Date("2021-09-25"),
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bobbrown@example.com",
    mobile: "444-555-8888",
    address: "321 Pine Road, Miami, FL",
    role: "Inventory",
    hireDate: new Date("2020-06-15"),
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emilyd@example.com",
    mobile: "222-333-4444",
    address: "654 Birch Drive, Seattle, WA",
    role: "Sales",
    hireDate: new Date("2023-08-01"),
  },
  {
    id: 6,
    name: "Michael Wilson",
    email: "michaelw@example.com",
    mobile: "111-222-3333",
    address: "987 Cedar Street, Boston, MA",
    role: "Manager",
    hireDate: new Date("2019-11-12"),
  },
  {
    id: 7,
    name: "Sophia Martinez",
    email: "sophiam@example.com",
    mobile: "333-444-5555",
    address: "159 Walnut Way, Los Angeles, CA",
    role: "Inventory",
    hireDate: new Date("2021-02-19"),
  },
  {
    id: 8,
    name: "William Lee",
    email: "williaml@example.com",
    mobile: "888-999-0000",
    address: "753 Willow Street, San Francisco, CA",
    role: "Admin",
    hireDate: new Date("2022-07-10"),
  },
];

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    addStaff: (state, action) => {
      const lastId = state[state.length - 1].id;
      action.payload.id = lastId + 1;
      state.push(action.payload);
    },
    updateStaff: (state, action) => {
      const index = state.findIndex((staff) => staff.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteStaff: (state, action) => {
      return state.filter((staff) => staff.id !== action.payload.id);
    },
  },
});

export const { addStaff, updateStaff, deleteStaff } = staffSlice.actions;
export default staffSlice.reducer;
