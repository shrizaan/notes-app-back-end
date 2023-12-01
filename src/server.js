const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');

// notes
const notes = require('./api/notes/index');
const NotesServices = require('./services/postgres/NotesServices');
const NotesValidator = require('./validator/notes/index');

// users
const users = require('./api/users/index');
const UsersServices = require('./services/postgres/UsersServices');
const UsersValidator = require('./validator/users');

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
  const userService = new UsersServices();

  await server.register([
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
        service: userService,
        validator: UsersValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
