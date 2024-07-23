
# Chat Service

A microservice for real-time chat functionality built with Next.js, WebSocket, and MongoDB. This service supports both one-on-one and group chats, along with message history and search capabilities.

## Features

- Real-time messaging between users
- Group chat functionality
- Message history and search
- Online status indicators
- User-friendly interface

## Tech Stack

- Next.js
- WebSocket (for real-time communication)
- MongoDB (for storing chat messages)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- MongoDB instance (local or cloud-hosted)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Aliabdo6/chat-service.git
   cd chat-service
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add the following:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
   ```
   Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

## Running the Application

To run the application in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Usage

1. Open the application in your web browser.
2. Enter a username.
3. Select a chat room or create a new one.
4. Start chatting!

You can use the search bar to filter messages within the current chat room.

## Contributing

Contributions to this project are welcome. Please fork the repository and create a pull request with your changes.

