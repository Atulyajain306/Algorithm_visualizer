import { createSlice, current } from "@reduxjs/toolkit";

const initialSlice = {
    activity: false,
    showModal: false,
    pendingPath: null,
}

const generalSlice = createSlice({
    name: 'general',
    initialState: initialSlice,
    reducers: {
        setActivity(state, action) {
            state.activity = action.payload;
        },
        showNavigationModal: (state, action) => {
            state.showModal = true;
            state.pendingPath = action.payload;
        },
        hideNavigationModal: (state) => {
            state.showModal = false;
            state.pendingPath = null;
        },
    }
})

export default generalSlice;