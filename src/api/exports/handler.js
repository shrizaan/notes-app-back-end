const ClientError = require('../../exceptions/ClientError');

class ExportsHandler {
  constructor(producerService, validator) {
    this._producerService = producerService;
    this._validator = validator;
  }
  
  async postExportNotesHandler(request, h) {
    try {
      this._validator.validateExportNotesPayload(request.payload);
      
      const { targetEmail } = request.payload;
      const { id: credentialId } = request.auth.credentials;
      
      const message = {
        userId: credentialId,
        targetEmail,
      };
      
      await this._producerService.sendMessage('export:notes', JSON.stringify(message));
      
      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda dalam antrean',
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
      
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = ExportsHandler;
