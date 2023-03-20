import { createSlice } from '@reduxjs/toolkit'

export interface TypeState {
    value: string
}

const initialState: TypeState = {
    value: 'member',
}

export const userTypeSlice = createSlice({
    name: 'userType',
    initialState,
    reducers: {
        setAdmin: (state) => {
            state.value = 'admin'
        },
        setMember: (state) => {
            state.value = 'member'
        }
    },
})

// Action creators are generated for each case reducer function
export const {setAdmin, setMember} = userTypeSlice.actions

export default userTypeSlice.reducer