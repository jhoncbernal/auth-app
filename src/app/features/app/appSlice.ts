import _ from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  isVerifyModalOpen: boolean;
  isPhoneModalOpen: boolean;
}

const initialState: State = {
  isVerifyModalOpen: false,
  isPhoneModalOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setState(state, action: PayloadAction<Partial<State>>) {
      _.merge(state, action.payload);
    },
  },
});

export const { setState } = appSlice.actions;

export default appSlice.selectSlice;
