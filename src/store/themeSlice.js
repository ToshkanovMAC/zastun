import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  darkMode: false,
};
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
});
export default themeSlice.reducer;
