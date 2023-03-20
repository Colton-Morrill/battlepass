import { createSlice } from '@reduxjs/toolkit'

export interface PointState {
    value: number
}

const initialState: PointState = {
    value: 0,
}

export const battlePointSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {
        addPoints: (state) => {
            state.value = ++state.value;
        },
        removePoints: (state) => {
            state.value = --state.value;
        }
    },
})

// Action creators are generated for each case reducer function
export const { addPoints, removePoints } = battlePointSlice.actions

export default battlePointSlice.reducer