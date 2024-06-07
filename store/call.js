import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    callType: '',
    receiptUserId: '',
}

export const callSlice = createSlice({
    name: 'call',
    initialState,
    reducers: {
        setCall: (state, action) => {
            state.callType = action.payload._callType;
            state.receiptUserId = action.payload._receiptUserId;
        }
    }
});

export const { setCall } = callSlice.actions;

export default callSlice.reducer;