import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setting: (state, action) => {
            return `You voted '${action.payload}'`
        },
        removing: (state, action) => {
            return ''
        }
    }
})

export const {setting,removing} = notificationReducer.actions

export default notificationReducer.reducer