import { createSlice, current } from "@reduxjs/toolkit";

const initialSlice = {
    treeObject: null,
    treeArr: null,
    currentOp: [null, null],
    heapType: null,
    heapArr: null,
    minMaxNumber: null,

}

const bstSlice = createSlice({
    name: 'bst',
    initialState: initialSlice,
    reducers: {
        setTreeObject(state, action) {
            state.treeObject = JSON.parse(JSON.stringify(action.payload));
        },
        setCurrentOp(state, action) {
            state.currentOp = JSON.parse(JSON.stringify(action.payload));
        },
        setTreeArr(state, action) {
            state.treeArr = JSON.parse(JSON.stringify(action.payload));
        },
        setHeapType(state, action) {
            state.heapType = JSON.parse(JSON.stringify(action.payload));
        },
        setHeapArr(state, action) {
            state.heapArr = JSON.parse(JSON.stringify(action.payload));
        },
        pushHeapArr(state, action) {
            state.heapArr.push(action.payload);
        },
        setMinMaxNumber(state, action) {
            state.minMaxNumber = action.payload;
        },


    }
})

export default bstSlice;