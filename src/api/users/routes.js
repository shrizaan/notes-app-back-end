const routes = (handler) => [
  {
    path: '/users',
    method: 'POST',
    handler: (request, h) => handler.postUserHandler(request, h),
  },
  {
    path: '/users/{id}',
    method: 'GET',
    handler: (request, h) => handler.getUserByIdHandler(request, h),
  },
];

module.exports = routes;
