# server.js-auth-example

> [PassportJS](https://github.com/jaredhanson/passport) + [JWT](https://github.com/auth0/node-jsonwebtoken) + [ServerJs](https://github.com/franciscop/server)

### Setup

```bash
# Clone repo
❯ git clone https://github.com/frenchbread/server.js-auth-example.git && cd server.js-auth-example

# Install dependencies
❯ yarn install
# or
❯ npm install

# Start server
❯ node server.js
```

### Usage

#### Register new user

```bash
❯ curl -H "Content-Type: application/json" -X POST -d '{"email":"some@mail.com","password":"somepassword"}' http://localhost:3030/register

# Server reply
{"ok":true,"message":"Successfully created new user."}
```

#### Login

```bash
❯ curl -H "Content-Type: application/json" -X POST -d '{"email":"some@mail.com","password":"somepassword"}' http://localhost:3030/login

# Server reply
{"ok":true,"message":{"user":{"_id":"5a0129ec1cc973ec2e92b985","email":"some@mail.com"},"token":"<jwt_token_here>"}}
```

#### Verify

```bash
❯ curl -H 'Authorization: JWT <received_jwt_token>' -X GET http://127.0.0.1:3030/verify

# Server reply
{"ok":true,"user":{"_id":"5a0129ec1cc973ec2e92b985","email":"some@mail.com","__v":0}}
```

### License

[MIT](https://github.com/frenchbread/server.js-auth-example/blob/master/LICENSE)
