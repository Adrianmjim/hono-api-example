# HonoJS API Example with Drizzle, Neon, and Inversify on Cloudflare Workers

This repository contains an example API built with [Hono](https://github.com/honojs/hono). It leverages [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) for database operations on [Neon](https://neon.tech) and uses [InversifyJS](https://github.com/inversify/InversifyJS) for dependency injection. The entire application is deployed on [Cloudflare Workers](https://workers.cloudflare.com) for a serverless and globally distributed environment.

## Deployed API Endpoint

The API is deployed and live at the following URL:

- **Live API URL:** [https://hono-api-example.adrianmjim.workers.dev](https://hono-api-example.adrianmjim.workers.dev)

## Features

- **Hono Framework**: A fast, minimalist web framework designed for Cloudflare Workers.
- **Drizzle ORM**: A lightweight and type-safe SQL query builder and ORM.
- **Neon Database**: A serverless PostgreSQL solution.
- **InversifyJS**: A robust dependency injection library to promote modular and maintainable code.
- **Serverless Deployment**: Easily deploy your API on Cloudflare Workers for scalability and global performance.

## Getting Started

Follow these instructions to set up the project locally and get started with development.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) as your package manager
- A Neon account with an active PostgreSQL database ([Neon](https://neon.tech))

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adrianmjim/hono-api-example.git
   cd hono-api-example
   ```

2. **Install dependencies using pnpm:**

    ```bash
    pnpm install
    ```

3. **Configure Environment Variables:**
  
    Create a .env file in the root directory with your environment-specific variables. For example:
  
    ```env
    DATABASE_URL=postgres://user:password@your-neon-database-url:port/database
    ```

    Adjust these variables according to your configuration.

## Usage

To run the API locally, use:

  ```bash
  pnpm dev
  ```

## Deployment
To deploy the API to Cloudflare Workers:

  ```bash
  pnpm run deploy
  ```

Make sure your wrangler.json is properly configured with your account details and project settings. This command builds and deploys your API to Cloudflare Workers.

## API Endpoints

Here are some example endpoints included in this API:

- `GET /`  
  Returns a ok message.

- `GET /cats`  
  Retrieves a list of cats.

- `POST /cats`  
  Creates a new cat.

- `GET /cats/:id`  
  Retrieves a specific cat by its ID.

- `PUT /cats/:id`  
  Updates an existing cat.

- `DELETE /cats/:id`  
  Deletes an cat.

> **Note:** These endpoints are provided as examples. Adjust or expand them to fit your application’s requirements.


## 🤝 Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/adrianmjim/hono-api-example/issues)

Contributions, issues and feature requests are welcome.

## Authors

👤 **Adrián Martínez Jiménez**

- Github: [@adrianmjim](https://github.com/adrianmjim)

See also the list of contributors who [participated](https://github.com/adrianmjim/hono-api-example/contributors) in this project.

## Show Your Support

Please ⭐️ this repository if this project helped you!

## 📝 License

Copyright © 2025 [Adrián Martínez Jiménez](https://github.com/adrianmjim).

This project is licensed under the MIT License - see the [LICENSE file](LICENSE) for details.