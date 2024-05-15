import {createSlice} from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
  },
  reducers: {
    addUser(state, action) {
      state.data.push(action.payload);
    },
  },
});

export const {addUser} = UserSlice.actions;
export default UserSlice.reducer;

// Asynchronous action creator to save data to AsyncStorage
export const saveUserData = userData => async dispatch => {
  try {
    // Save the data to AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    // Dispatch the addUser action to update the Redux state
    dispatch(addUserAction(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};
