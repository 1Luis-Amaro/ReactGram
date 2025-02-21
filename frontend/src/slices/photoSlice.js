import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";


const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

//Publish user photo
export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    try {
      // Obtém o token do estado Redux
      const token = thunkAPI.getState().auth?.user?.token;
    

      if (!token) {
        return thunkAPI.rejectWithValue("Token ausente ou inválido.");
      }

      // Faz a requisição ao serviço
      const data = await photoService.publishPhoto(photo, token);

      // Verifica se há erros na resposta
      if (data.errors) {
        return thunkAPI.rejectWithValue(data.errors[0] || "Erro desconhecido.");
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Erro ao publicar foto.");
    }
  }
);


export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(publishPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
          })
          .addCase(publishPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
            state.photos.unshift(state.photo)
            state.message = "Foto publicada com sucesso!"
          })
          .addCase(publishPhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.photo = {}
          })
        }
})

export const {resetMessage} = photoSlice.actions
export default photoSlice.reducer
