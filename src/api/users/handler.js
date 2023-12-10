const ClientError = require('../../exceptions/ClientError');

class UsersHandler {
  constructor(services, validator) {
    this._services = services;
    this.validator = validator;
  }

  async postUserHandler(request, h) {
    try {
      this.validator.validateUserPayload(request.payload);
      const { username, password, fullname } = request.payload;
      const userId = await this._services.addUser({ username, password, fullname });
      const response = h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server Error
      const response = h.response({
        status: 'fail',
        message: 'Maaf, terjadi kesalahan pada server kami',
      });
      response.code(500);
      return response;
    }
  }

  async getUserByIdHandler(request, h) {
    try {
      const user = await this._services.getUserById(request.params.id);
      return {
        status: 'success',
        data: {
          user,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server Error
      const response = h.response({
        status: 'fail',
        message: 'Maaf, terjadi kesalahan pada server kami',
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = UsersHandler;
