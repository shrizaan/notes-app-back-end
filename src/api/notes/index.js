import routes from './routes.js';
import NotesHandler from './handler.js';

export default {
  name: 'notes',
  version: '1.0.0',
  register: async (server, { service }) => {
    const notesHandler = new NotesHandler(service);
    server.route(routes(notesHandler));
  },
};
