# Auction-System

Welcome to the exciting world of the Live Auctions System's Backend APIs! This document takes you on a journey into the
heart of our dynamic system, where you'll discover the powerful APIs that drive the seamless operation of live auctions.
Our backend APIs handle a multitude of tasks, from user authentication and data management to interaction with the
database. With these APIs, you'll be able to create, manage, and participate in live auctions with ease.

## Technologies Used

- **Node.js and Express**: Our backend is built using Node.js and the Express framework, providing a robust and
  efficient environment for handling API requests and responses.

- **PostgreSQL with Sequelize**: We utilize PostgreSQL as our relational database, and Sequelize as the ORM (
  Object-Relational Mapping) to interact with the database, making data manipulation and querying more intuitive.

- **JWT (JSON Web Tokens)**: Authentication is secured using JSON Web Tokens. JWTs provide a reliable and stateless way
  of securely transmitting information between parties.

- **Socket.IO**: For real-time interactions during live auctions, we integrate Socket.IO, enabling bid updates,
  notifications, and dynamic engagement.

- **Docker and Docker Compose**: The entire backend system is containerized using Docker, ensuring seamless deployment
  and consistent environments across different platforms. Docker Compose simplifies multi-container deployments.

## Features

- **User Authentication**: Secure registration and login for both administrators and clients. Password recovery
  mechanisms are also provided for user convenience.

- **Admin Actions**: Admin users have comprehensive control over the system. They can view registered users, manage live
  auctions (create, update, deactivate), and oversee the auction process.

- **Auction Management**: The system provides endpoints to view upcoming live auctions, retrieve detailed auction
  information, and explore associated products.

- **Items Management**: Admins can create, update, and delete items, as well as view all items in the system.

- **Bidding Conditions**: Admins can set detailed bidding conditions for items, providing users with essential
  information before bidding.

- **Bidding**: Clients can actively participate in auctions by placing bids on products. APIs enable bid placement and
  retrieval, fostering engagement and competition.

- **Dynamic Interaction**: Our APIs support real-time interactions during live auctions, creating a thrilling experience
  for both admins and clients.
