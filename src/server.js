const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');

const notes = require('./api/notes/index.js');
const NotesServices = require('./services/postgres/NotesServices.js');
const NotesValidator = require('./validator/notes/index.js');

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

  // Services
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
