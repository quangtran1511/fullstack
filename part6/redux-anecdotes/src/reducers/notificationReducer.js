import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification: (state, action) => {
            return action.payload
        },
        clearNotification: (state, action) => {
            return ''
        }
    }
})

export const setNotifications = (content, time) => {
    return async dispatch => {
     dispatch(setNotification(content))
     setTimeout(() => {
        dispatch(clearNotification())
     }, time*1000)
    }
}

export const {setNotification,clearNotification} = notificationReducer.actions

export default notificationReducer.reducer