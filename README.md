# Kino Chat

Front-end [ [Repo](https://github.com/alexjcode/kino-chat) / [Deployed](https://alexjcode.github.io/kino-chat) ]

Back-end [ [Repo](https://github.com/alexjcode/kino-chat-api) / [Deployed](https://kino-chat-api-55523.herokuapp.com) ]
​

[<img src="https://i.imgur.com/5AuGTGg.png">](https://alexjcode.github.io/kino-chat)

## Summary
A simple chat app where users can discuss films and shows that they're watching online. Netflix doesn't have any sort of comment section or forum, so this is meant to fill that need.

## Getting Started
- Click the `Sign Up` button at the top of the page to make an account
- Fill in an email and password `don't use a password that you use on other sites` and click submit
- You're now signed in! Go ahead and chat with the group by adding new messages.
- If you made a mistake, either click the message to edit, or click the `x` button to delete your message
​
## Technologies used
- Node.js
- React.js
- Javascript
- Socket.io
- Express
- MongoDB
- Mongoose
- Webpack
- React-Bootstrap
- Git
- GitHub

## Setup Front End
- `git clone` this repo
- `cd` into its directory
- `npm install`
- `npm start`

## Planning
- Create both repos
- Deploy
- Create a basic API, with users and messages owned by the users
- Figure out how to use Socket.io with React and API
- Complete the Front End functionality using React and Socket.io

## Process
Most of the project consisted of me learning Socket, and learning how to use React correctly. The rest was very straightforward, especially the API.
​
## Problem Solving Strategy
The biggest bump in the road was not knowing how use Socket.io, and that along with Reatc took me about 2 days to figure out.
To figure out Socket and React, I was quicker about making issues in the issue queue, I watched YouTube videos, I looked at the docs, at StackOverflow, FreeCodeCamp, Medium, and anything else I could find. Many of the smaller bugs I encountered were misspelling or mislabeling of elements.
​
## Wireframes
<img src="https://i.imgur.com/p4TUWTO.jpg" width="100%" alt="Wireframes">

## User Stories
- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to join a chat room.
- As a signed in user in a room, I would like to see all messages in the chat room.
- As a signed in user in a room, I would like to send my own messages to the chat room.
- As a signed in user in a room, I would like to update my own messages to the chat room.
- As a signed in user in a room, I would like to delete my own messages to the chat room.

## Unsolved Problems
- Needs Styling
- Profile pictures
- Allow for users to join different channels in a chat room.
- Anti-spam filtering
- Search for channels
- **FilmTalk: Channels are centered around episodes of shows or films. Chat with others while watching your favorite shows. Uses a 3rd party API.
