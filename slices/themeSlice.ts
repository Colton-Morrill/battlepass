import { createSlice } from '@reduxjs/toolkit'

export interface ThemeState {
    value: string
}

const initialState: ThemeState = {
    value: "dark",
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            if (state.value === 'light') {
                state.value = 'dark'
            } else {
                state.value = 'light'
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer