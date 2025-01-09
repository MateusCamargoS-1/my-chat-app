import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignupState {
  name: string;
  email: string;
  location: string;
  password: string;
  error: string | null;
}

const initialState: SignupState = {
  name: '',
  email: '',
  location: '',
  password: '',
  error: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setSignupData(state, action: PayloadAction<SignupState>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.location = action.payload.location;
      state.password = action.payload.password;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setSignupData, setError } = signupSlice.actions;
export default signupSlice.reducer;
