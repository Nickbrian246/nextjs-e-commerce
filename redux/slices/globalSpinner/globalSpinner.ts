import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isActiveLoadingSpinner: boolean;
  itemID?: string;
}
const initialState: InitialState = {
  isActiveLoadingSpinner: false,
  itemID: "",
};
export const globalSpinner = createSlice({
  name: "globalSpinner",
  initialState,
  reducers: {
    activeGlobalSpinner: (state, action: PayloadAction<InitialState>) => {
      const itemID = action.payload.itemID ?? "";
      return { isActiveLoadingSpinner: true, itemID };
    },
    disableGlobalSpinner: (state) => {
      return { isActiveLoadingSpinner: false, itemID: "" };
    },
  },
});
export default globalSpinner.reducer;

export const { activeGlobalSpinner, disableGlobalSpinner } =
  globalSpinner.actions;
