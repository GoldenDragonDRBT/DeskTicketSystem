import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get ticket notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (ticketId, thunkAPI) => {
    // console.log(ticketData)
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message); // Rejected and then put it in the payload
      // So if sum thing gets wrong the message will passed in ".rejectWithValue(message)"
    }
  }
);

// Create a ticket note
export const createNote = createAsyncThunk(
  'notes/create',
  async ({ noteText, ticketId }, thunkAPI) => {
    // console.log(ticketData)
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNote(noteText, ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message); // Rejected and then put it in the payload
      // So if sum thing gets wrong the message will passed in ".rejectWithValue(message)"
    }
  }
);

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducer: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // As we remember if its rejected in "catch(error)" where we have our message and then we call this "rejectWithValue(message)" pass this message in and that send as an "action.payload".
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload); // In regular Redux this implementation will not work because this state is inimitable, but because we using Redux tool kit that alow us implement this state in order.
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // As we remember if its rejected in "catch(error)" where we have our message and then we call this "rejectWithValue(message)" pass this message in and that send as an "action.payload".
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
