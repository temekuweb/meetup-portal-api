# Meetup-Portal-API

Backend specifications v1

Byron Coughlin

Created Oct. 17, 2018

Updated Oct. 25, 2018

[Services](##Services)

[Models](##Models##)

[Hooks](##Hooks##)

[Database](##Database##)

[Collections](##Collections##)

_Description_

Document specifications to create the backend for the Meetup-Portal_API backend. Describes the specifications for the first version. These include registration, login and profile.

Generations of app, services and hooks are specified. Also framework and resources that are necessary to create a full functioning backend.

This document does not give specific code that needs to be written. But documents paramaters that are needed to communicate between different features and the frontend.

_Project Description_

This is the first version of the meetup-portal website project. This version will consist of allowing interested people to register on the site. Capabilities to login arter registering. It will also allow users to create/view and edit their profile. These specifications are only for the backend. They are created while communicating with the frontend development team.

Registration: Is the first step. It will consist of minimal fields for user to input. After user enters registration request an email will be sent to verify correct email. Upon user verifying email he/she will be taken to profile form.

Login: After a user has completed registering where they have created username and password, they will be able to login with those credentials.

Profile: Users profile will allow the individual to tell about themself. It will also have the ability to update there password.

**App**

When running **feathers generate app** use following information

- name: meetup-portal-api
- description: backend implementation for the temekuweb meetup-portal
- type of API: Rest and realtime via socket.io
- version: 1.0
- homepage: “”
- main: src
- keywords [feathers]
- author {name: Nick Olsen, email <yepistemic@gmail.com>
- contributors []
- bugs {}
- directories: { lib: src, test: test/ }
- engines: {node ^8.0.0, yarn: >= 0.18.0}

Framework
Node.js – Open source server enviroment. Uses javascript on the server
Featherjs – Open source REST and realtime API layer. Feathers is a set of tools and an architecture pattern that make it easy to create scalable REST APIs and real-time applications.
MongoDb - MongoDB is a document database.
Mongoose - Mongoose provides a straight-forward, schema-based solution to model your application data. It
JSON Web Token (JWT) open standard to be used to securely transmit authorization infomation

Feathers
Service methods – pre-defined CRUD methods service method can implement or are implemented
find(params)
get(id, params)
create(data, params)
update(id, data, params)
patch(id, data, params)
remove(id, params)
setup(app, path)

Features
Registration
User clicks registration button registration page opens allowing user to register. The registration page calls users service.

Before:
create [hashpassword()]

service: users
Params:
_ • email unique valid format
_ • password

creates new profile

Returns
_ • 201 - Created
_ • 400 - Validation errors (password issue)
• 409 - User exists

Login
User clicks login button. Login uses the users service. before: get [ authenticate('jwt') ]

service users
Params
• username
• password

Returns
◦ 200 - Token and User Object
◦ 401 - Invalid username/password

Authentication

Authentication
JSON Web Token (JWT) open standard to be used to securely transmit authorization infomation between parties as a JSON object. The information will be digitally signed. Once the user is logged in, each subsequent request will be will include JWT.

When running feathers generate authentication enter following information
Provider: Username + Password (local)
entity service: users
kind of service: mongoose
connection string mongodb://localhost:27017/meetup_portal_api

Services
UsersServices
Automatically created when authentication is generated

Profile
Type: mongoose
name: profile
path: /profile
authenticate: yes

Models
profile
Model -
Type: mongoose
Username Unique, required
Fullname

- Email
  Info: {

        { Location: { Type String }

        isPublic: true }
        }

  - Links: [
    url: { Type: String }
  - description { Type: String }]
    - Bio
      - Picture
      - Gravatar

hooks
Gravatar – Globaly reconized avatar

- name: Gravatar
- hook type: before
- Service: user
- Method: create

require crypto - Use MD5 hash

URL – <https://s.gravatar.com/avatar>
size – 200px
param: email

reset

Params

- Password
- email

Returns

- 200 - Email sent
- 400 - Email doesn’t exist

## Database

Mongo
Description: MongoDb is used to store persistant data. It is a light weight NoSql database that uses a document-oriented data model. . It has been choosen for its easy learning functionality and its looks very much like JSON. Mongoose will be used as a frontend to the Mongo database. Mongoose is an object modeling tool designed to work in an asynchronous enviroment. Instead of tables as used in a relational database, Mongo uses collections of documents.

## Collections

Name
user
profile

| Data     | Field Type | Options | Description                 |
| -------- | ---------- | ------- | --------------------------- |
| username | String     |         | Name user will use to login |
| Email    | String     |         | Users email address         |
| Password | String     |         | hashed password             |
| fullname | String     |         | Users full name             |
