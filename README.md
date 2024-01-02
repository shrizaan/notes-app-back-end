# Notes API

## Description

This project is a Node.js application that provides various APIs for managing notes, users, collaborations, and more. It uses PostgreSQL for data storage, Redis for caching, and RabbitMQ for message queuing.

## Installation

1. Clone this repository:
   ```sh
   git clone <repository-url>
   ```
2. Install dependencies.
   ```sh
    npm install
   ```
3. Set up your environment variables in a .env file. You'll need:
   - `PORT`: The port your server will run on
   - `HOST`: The host your server will run on
   - `ACCESS_TOKEN_KEY`: The key for your JWT access tokens
   - `ACCESS_TOKEN_AGE`: The maximum age for your JWT access tokens
   - `PGUSER`: The username for your PostgreSQL database
   - `PGPASSWORD`: The password for your PostgreSQL database
   - `PGHOST`: The host for your PostgreSQL database
   - `PGPORT`: The port for your PostgreSQL database

## Usage

To start the server, run:
```sh
npm start
```

## API Endpoints

### Notes API

- `GET /notes`: Get all notes
- `GET /notes/{id}`: Get a note by ID
- `POST /notes`: Add a new note
- `PUT /notes/{id}`:Update a note by ID
- `DELETE /notes/{id}`: Delete a note by ID

### Users API

- `POST /users`: Register a new user
- `POST /users/login`: Login a user

### Collaborations API

- `POST /collaborations`: Add a collaboration
- `DELETE /collaborations`: Delete a collaboration

### Authentications API

- `POST /authentications`: Authenticate a user
- `PUT /authentications`: Refresh authentication
- `DELETE /authentications`: Logout a user

### Exports API

- `POST /exports`: Export notes

### Uploads API

- `POST /uploads`: Upload an image


> For more detailed documentation, please refer to the [API documentation](https://documenter.getpostman.com/view/13391600/Tz5tWvQr).


## Testing

This project uses Postman for API testing. You can find the Postman collection in the `postman/` directory.

## Contributing

Contributions are welcome! Please read the contributing guidelines first.

## License

This project is licensed under the MIT License.
