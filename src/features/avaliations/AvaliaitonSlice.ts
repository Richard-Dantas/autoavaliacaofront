import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";

export interface Avaliation {
    id: null | string;
    name: string;
    questionCount: number;
    creationDate: null | string;
    is_Active: boolean;
}

const endpointUrl: string = "avaliation";

const avaliationApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query}) => ({
        getAvaliations: query<Avaliation, void>({
            query: () => `${endpointUrl}`,
            providesTags:["Avaliations"],
        })
    })
})

const avaliation: Avaliation = {
    id:"37ca69ba-fae5-4ba1-ae5a-6b211116a8a3",
    name:"Av",
    questionCount:0,
    creationDate:"",
    is_Active:true,
}

export const initialState = [
    avaliation,
    { ... avaliation, id: "37ca69ba-fae5-4ba1-ae5a-6b211116a8a3", name: "Av1"},
    { ... avaliation, id: "37ca69ba-fae5-4ba1-ae5a-6b211116a8a3", name: "Av2"},
    { ... avaliation, id: "37ca69ba-fae5-4ba1-ae5a-6b211116a8a3", name: "Av3"},
];

const avaliationsSlice = createSlice({
    name: "avaliations",
    initialState: initialState,
    reducers: {
        createAvaliation(state, action) {
            state.push(action.payload);
        },
        updateAvaliation(state, action) {
            // find index on state of avaliation update
            const index = state.findIndex((avaliation) => avaliation.id === action.payload.id);
            // update avaliation on state
            state[index] = action.payload;
        },
        deleteAvaliation(state, action) {
            // find index on state of avaliation delete
            const index = state.findIndex((avaliation) => avaliation.id === action.payload.id);
            // delete avaliation on state
            state.splice(index, 1);
        },
    },
})

// Selectors
export const selectAvaliations = (state: RootState) => state.avaliations;
// select avaliation by id
export const selectAvaliationById = (state: RootState, id: string) => {
    const avaliation = state.avaliations.find((avaliation) => avaliation.id === id);
    return (
        avaliation || {
            id: "",
            name: "",
            questionCount: 0,
            creationDate: "",
            is_Active: false,
        }
    );
};

export default avaliationsSlice.reducer;
export const { createAvaliation, updateAvaliation, deleteAvaliation} =
    avaliationsSlice.actions;