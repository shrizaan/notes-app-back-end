import Hapi from '@hapi/hapi';

import notes from './api/notes/index.js';
import NotesServices from './services/inMemory/NotesServices.js';
import NotesValidator from "./validator/notes/index.js";

const init = async () => {
  const server = Hapi.server({
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    port: 3000,
    routes: {
      cors: true,
    },
  });

  const notesService = new NotesServices();

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
