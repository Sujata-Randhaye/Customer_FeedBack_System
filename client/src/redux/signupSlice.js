import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const signUpApi=createAsyncThunk(
    'signup/submit',
    async(userData)=>{
    const response=await axios.post('http://localhost:3000/api/signup',userData)
    return response.data
}
)
const SignupSlice=createSlice({
    name:'signup',
    initialState:{
        user:null,
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(signUpApi.pending,(state)=>{
            state.status='Loading'
        })
        .addCase(signUpApi.fullfilled,(state,action)=>{
            state.status='succeeded'
            state.user=action.payload
        })
        .addCase(signUpApi.rejected,(state,action)=>{
            state.status='failed'
            state.error=action.error.message
        })
    }
})
export const {sig}=SignupSlice.actions
export default SignupSlice.reducer