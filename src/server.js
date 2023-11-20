import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';

import notes from './api/notes/index.js';
import NotesServices from './services/inMemory/NotesServices.js';
import NotesValidator from './validator/notes/index.js';

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
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
