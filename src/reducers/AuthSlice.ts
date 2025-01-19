import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  email: string;
  role: string;
  token?: string; 
}

interface AuthPayload {
  email: string;
  password: string;
}


const MOCK_USERS = [
  { email: "admin1@example.com", password: "password123", role: "ADMIN" },
  { email: "user@example.com", password: "user123", role: "USER" },
];

const initialState: AuthState = {
  isAuthenticated: false,
  email: "",
  role: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthPayload>) => {
      const { email, password } = action.payload;
      
      const user = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        return {
          isAuthenticated: true,
          email: user.email,
          role: user.role,
          token: "mock-jwt-token-" + Math.random(), 
        };
      }
      
      return state; 
    },
    
    signUp: (state, action: PayloadAction<AuthPayload>) => {
      const { email, password } = action.payload;
      const NewUser = { email, password, role: "USER" };
      return {
        isAuthenticated: true,
        email: NewUser.email,
        role: NewUser.role, 
        token: "mock-jwt-token-" + Math.random(),
      };
    },
    
    logout: () => {
      return initialState;
    },
  },
});

export const { login, signUp, logout } = authSlice.actions;
export default authSlice.reducer;
