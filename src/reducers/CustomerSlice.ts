import Customer from "../models/Customer";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Customer[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+1 234-567-8901",
    address: "123 Main St, City, USA",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "+1 234-567-8902",
    address: "456 Oak Ave, Town, USA",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    mobile: "+1 234-567-8903",
    address: "789 Pine Rd, Village, USA",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    mobile: "+1 234-567-8904",
    address: "321 Elm St, Hamlet, USA",
  },
  {
    id: 5,
    name: "Bob White",
    email: "bob.white@example.com",
    mobile: "+1 234-567-8905",
    address: "654 Maple Blvd, Borough, USA",
  },
  {
    id: 6,
    name: "Carol Green",
    email: "carol.green@example.com",
    mobile: "+1 234-567-8906",
    address: "987 Cedar Ct, Township, USA",
  },
  {
    id: 7,
    name: "Eve Black",
    email: "eve.black@example.com",
    mobile: "+1 234-567-8907",
    address: "111 Birch Ln, District, USA",
  },
  {
    id: 8,
    name: "Frank Blue",
    email: "frank.blue@example.com",
    mobile: "+1 234-567-8908",
    address: "222 Walnut Ave, Region, USA",
  },
  {
    id: 9,
    name: "Grace Yellow",
    email: "grace.yellow@example.com",
    mobile: "+1 234-567-8909",
    address: "333 Chestnut Dr, Zone, USA",
  },
  {
    id: 10,
    name: "Henry Purple",
    email: "henry.purple@example.com",
    mobile: "+1 234-567-8910",
    address: "444 Spruce Way, Area, USA",
  },
  {
    id: 11,
    name: "Ivy Orange",
    email: "ivy.orange@example.com",
    mobile: "+1 234-567-8911",
    address: "555 Fir St, Sector, USA",
  },
];

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      //This is to create a new id for the new customer
      // based on the last id in the state
      const lastId = state[state.length - 1].id;
      action.payload.id = lastId + 1;
      state.push(action.payload);
    },
    updateCustomer: (state, action) => {
      const index = state.findIndex(
        (customer) => customer.id === action.payload.id
      );
      state[index] = action.payload;
    },
    deleteCustomer: (state, action) => {
      return state.filter((customer) => customer.id !== action.payload);
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer } =
  customerSlice.actions;
export default customerSlice.reducer;
