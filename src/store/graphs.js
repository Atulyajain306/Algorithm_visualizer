import { createSlice } from "@reduxjs/toolkit";
import { arrToAdjacencyList, arrToAdjacencyMatrix } from "../algorithms/graphs";

const initialSlice = {
    edgesArr: null,
    list: null,
    matrix: null,
    graph: null,
    graphType: null,
    timeline: null,
    ind: null,
}

const graphsSlice = createSlice({
    name: 'graphs',
    initialState: initialSlice,
    reducers: {
        setEdgesArr(state, action) {
            const graph = action.payload[0];
            const graphType = action.payload[2];
            const graphNo = action.payload[1];
            if (graphType % 2 === 1) {
                state.edgesArr = JSON.parse(JSON.stringify(graph.directedEdges));
                const lst = arrToAdjacencyList(state.edgesArr);
                const mat = arrToAdjacencyMatrix(state.edgesArr);
                state.matrix = JSON.parse(JSON.stringify(mat));
                state.list = JSON.parse(JSON.stringify(lst));
                state.graph = JSON.parse(JSON.stringify(graph));
                state.graphType = graphType;
            } else {
                state.edgesArr = JSON.parse(JSON.stringify(graph.undirectedEdges));
                const lst = arrToAdjacencyList(state.edgesArr);
                const mat = arrToAdjacencyMatrix(state.edgesArr);
                state.matrix = JSON.parse(JSON.stringify(mat));
                state.list = JSON.parse(JSON.stringify(lst));
                state.graph = JSON.parse(JSON.stringify(graph));
                state.graphType = graphType;
            }

        },
        resetAll(state) {
            state.edgesArr = null;
            state.graph = null;
            state.graphType = null;
            state.list = null;
            state.matrix = null;
            state.ind = null;
            state.timeline = null;

        },
        setTimeline(state, action) {
            state.timeline = JSON.parse(JSON.stringify(action.payload));
        },
        setInd(state, action) {
            if (action.payload === "restart") {
                state.ind = null;
            }
            else if (state.ind === null) {
                state.ind = 0;
            } else if (state.ind === 0 && action.payload === -1) {
                state.ind = null;
            } else {
                state.ind += action.payload;
            }
        },
        resetAlgo(state) {
            state.ind = null;
            state.timeline = null;
        }

    }
})

export default graphsSlice;