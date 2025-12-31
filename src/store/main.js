import { createSlice, configureStore } from '@reduxjs/toolkit';
import bstSlice from './bstSlice';
import graphsSlice from './graphs';
import generalSlice from './general';

const store = configureStore({
    reducer: {
        bst: bstSlice.reducer,
        graphs: graphsSlice.reducer,
        general: generalSlice.reducer,
    },
});

export const bstActions = bstSlice.actions;
export const graphsActions = graphsSlice.actions;
export const generalActions = generalSlice.actions;



export default store;