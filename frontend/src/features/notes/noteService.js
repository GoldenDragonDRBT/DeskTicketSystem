import axios from 'axios';

const API_URL = '/api/tickets/';

// Get ticket notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      // As we remember when we send a "token" its has to be in a headers and in "authorization" filed, So just like we did in the "Postman" we doing the same thing accept we doing at from an app.
      Authorization: `Bearer ${token}`, // Takes "Bearer" Auth and the "token" which has an user "id".
    },
  };

  const response = await axios.get(API_URL + ticketId + '/notes', config);

  return response.data;
};

const noteService = {
  getNotes,
};

export default noteService;
