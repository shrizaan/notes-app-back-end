const ClientError = require('../../exceptions/ClientError');

class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  async postNoteHandler(request, h) {
    try {
      // Validasi data payload dari client
      this._validator.validateNotePayload(request.payload);

      const { title = 'untitled', body, tags } = request.payload;
      console.log(request.auth);
      const { id: credentialId } = request.auth.credentials;

      const noteId = await this._service.addNote({
        title,
        body,
        tags,
        owner: credentialId,
      });

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });
      response.code(201);
      return response;
    } catch (e) {
      if (e instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: e.message,
        });
        response.code(e.statusCode);
        return response;
      }
      // Server Error
      const response = h.response({
        status: 'fail',
        message: 'Maaf, terjadi kegagalan pada server kami. ',
      });
      response.code(500);
      console.error(e);
      return response;
    }
  }

  async getNotesHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    console.log(credentialId);

    const notes = await this._service.getNotes(credentialId);
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  async getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;
      await this._service.verifyNoteOwner(id, credentialId);
      const note = await this._service.getNoteById(id);

      const response = h.response({
        status: 'success',
        data: {
          note,
        },
      });
      response.code(200);
      return response;
    } catch (e) {
      if (e instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: e.message,
        });
        response.code(e.statusCode);
        return response;
      }
      // Server Error
      const response = h.response({
        status: 'fail',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(e);
      return response;
    }
  }

  async putNoteByIdHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload);

      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;
      
      await this._service.verifyNoteOwner(id, credentialId);
      await this._service.editNoteById(id, request.payload);

      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (e) {
      if (e instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: e.message,
        });
        response.code(e.statusCode);
        return response;
      }
      // Server Error
      const response = h.response({
        status: 'fail',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      console.error(e);
      response.code(500);
      return response;
    }
  }

  async deleteNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;
      
      await this._service.verifyNoteOwner(id, credentialId);
      await this._service.deleteNoteById(id);

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      });
      response.code(200);
      return response;
    } catch (e) {
      if (e instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: e.message,
        });
        response.code(e.statusCode);
        return response;
      }
      // Server Error
      const response = h.response({
        status: 'fail',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      console.error(e);
      response.code(500);
      return response;
    }
  }
}

module.exports = NotesHandler;
