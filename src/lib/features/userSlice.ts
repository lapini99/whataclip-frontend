import { createSlice } from '@reduxjs/toolkit';
import type { Family } from '@/interfaces/user';

const initialUserState = {
    name: '',
    email: '',
    avatar: '',
    role: '',
    families: [] as Family[],
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser(state, action) {
            const { name, email, avatar, role, families } = action.payload;
            state.name = name;
            state.email = email;
            state.avatar = avatar;
            state.role = role;
            state.families = families;
        },
        setName(state, action) {
            state.name = action.payload;
        },
        setEmail(state, action) {
            state.email = action.payload;
        },
        setAvatar(state, action) {
            state.avatar = action.payload;
        },
        setRole(state, action) {
            state.role = action.payload;
        },
        addFamily(state, action) {
            state.families.push(action.payload);
        },
    },
});

export const { setUser, setName, setEmail, setAvatar, setRole, addFamily } = userSlice.actions;
export default userSlice.reducer;