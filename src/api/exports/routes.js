const routes = (handler) => [
  {
    method: 'POST',
    path: '/exports/notes',
    handler: (request, h) => handler.postExportNotesHandler(request, h),
    options: {
      auth: 'notesapp_jwt',
    },
  },
];

module.exports = routes;
