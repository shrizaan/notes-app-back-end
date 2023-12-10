const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const laabr = require('laabr');

const notes = require('./api/notes/index.js');
const NotesServices = require('./services/postgres/NotesService.js');
const NotesValidator = require('./validator/notes/index.js');

const users = require('./api/users/index');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users/index');

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
  const usersService = new UsersService();

  await server.register([
    {
      plugin: laabr,
      options: {},
    },
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
  ]);

  await server.start();
  server.log(`Server berjalan pada ${server.info.uri}`);
};

init();
