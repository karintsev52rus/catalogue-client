import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendOrder } from "../../actions/dataActions";

export const sendNewOrder = createAsyncThunk("order/sendOrder", sendOrder);
