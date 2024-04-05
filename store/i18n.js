import { createSlice } from '@reduxjs/toolkit'
import transalations from '../transalations'
import { I18n } from 'i18n-js'

const initialState = {
  i18n: new I18n(transalations),
}

export const i18nSlice = createSlice({
  name: 'transalation',
  initialState,
  reducers: {
    changeLocale: (state, action) => {
        console.log('actions: ', action);
        state.i18n.locale = action.payload
    }
  },
})

export const { changeLocale } = i18nSlice.actions;

export default i18nSlice.reducer;