import Item from "../models/Item";
import { createSlice } from "@reduxjs/toolkit";
import Image1 from "../assets/1.jpg";
import Image2 from "../assets/2.jpg";
import Image3 from "../assets/3.jpg";
import Image4 from "../assets/4.jpg";
import Image5 from "../assets/5.jpg";
import Image6 from "../assets/6.jpg";
import Image7 from "../assets/7.jpg";
import Image8 from "../assets/8.jpg";

const initialState: Item[] = [
    {
      id: 1,
      name: "Air Max",
      image: Image1,
      price: 120,
      size: "9",
      qty: 5,
      status: "active",
    },
    {
      id: 2,
      name: "Classic Loafer",
      image: Image2,
      price: 85,
      size: "10",
      qty: 8,
      status: "inactive",
    },
    {
      id: 3,
      name: "Trail Runner",
      image: Image3,
      price: 95,
      size: "8",
      qty: 10,
      status: "out-of-stock",
    },
    {
      id: 4,
      name: "Slip-On",
      image: Image4,
      price: 60,
      size: "11",
      qty: 4,
      status: "active",
    },
    {
      id: 5,
      name: "Chelsea Boot",
      image: Image5,
      price: 150,
      size: "9",
      qty: 20,
      status: "inactive",
    },
    {
      id: 6,
      name: "High Top",
      image: Image6,
      price: 110,
      size: "10",
      qty: 13,
      status: "active",
    },
    {
      id: 7,
      name: "Flip Flops",
      image: Image7,
      price: 25,
      size: "8",
      qty: 18,
      status: "out-of-stock",
    },
    {
      id: 8,
      name: "Running Shoes",
      image: Image8,
      price: 130,
      size: "11",
      qty: 9,
      status: "active",
    },
  ];
  

const ItemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem(state, action) {
      const lastId = state[state.length - 1].id;
      action.payload.id = lastId + 1;
      state.push(action.payload);
    },
    updateItem(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteItem(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});


export const { addItem, updateItem, deleteItem } = ItemSlice.actions;
export default ItemSlice.reducer;