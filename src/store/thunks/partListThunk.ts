import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPartList } from "../../actions/dataActions";

export const setLoadedList = createAsyncThunk(
  "partList/setLoadedList",
  getPartList
);
