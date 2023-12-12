import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type severity = "success" | "warning" | "error";
export interface WarningInitialState {
  severity: severity;
  duration?: number;
  warningMessage: string;
  warningSubMessage?: string;
}

interface InitialState extends WarningInitialState {
  isActiveWarning: boolean;
}
const initialState: InitialState = {
  duration: 3000,
  severity: "error",
  warningMessage: "",
  warningSubMessage: "",
  isActiveWarning: false,
};
export const globalWarning = createSlice({
  name: "globalWarning",
  initialState,
  reducers: {
    activeWarning: (state, action: PayloadAction<InitialState>) => {
      return { ...state, ...action.payload };
    },
    disableWarning: (state) => {
      return { ...state, isActiveWarning: false };
    },
  },
});
export default globalWarning.reducer;

export const { activeWarning, disableWarning } = globalWarning.actions;
