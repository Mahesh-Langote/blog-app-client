
```markdown
# StoryForge

StoryForge is a blogging platform that allows users to share their stories, connect with readers, and build a community around their craft. This repository contains the client-side code for the StoryForge application.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Contact Information](#contact-information)

## Features

- User authentication (signup, login, logout)
- Create, read, update, and delete blog posts, add comment
- User profiles, view another user profile
- Responsive design for mobile and desktop
- SEO optimized

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Mahesh-Langote/blog-app-client.git
   ```

2. Navigate to the project directory:
   ```
   cd blog-app-client
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variable to the `.env` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
   
   Note: For production, change this to your deployed server URL.

## Running the Application

To run the application in development mode:

```
npm run dev
```

The application will be available at `http://localhost:3000` (or another port if 3000 is already in use).

## Building for Production

To create a production build:

```
npm run build
```

This will generate a `dist` folder with the compiled assets.

## Deployment

This project is set up for deployment on Vercel. Follow these steps to deploy:

1. Sign up for a Vercel account at https://vercel.com if you haven't already.

2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

3. Log in to Vercel:
   ```
   vercel login
   ```

4. From the project root, run:
   ```
   vercel
   ```

5. Follow the prompts to configure your deployment.

6. Once deployed, Vercel will provide you with a URL for your application.

Note: Make sure to set up your environment variables in the Vercel dashboard, including the `VITE_API_URL` pointing to your deployed server.

## API Documentation

The StoryForge API is hosted at: https://storyforgeserver.vercel.app

For detailed API documentation, please refer to the [server repository](https://github.com/Mahesh-Langote/blog-app-server.git).

## Contributing

Contributions to StoryForge are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Create a pull request

## Contact Information

For any questions, suggestions, or inquiries about this project, please feel free to contact the developer:

- **Name:** Mahesh Langote
- **Email:** maheshlangote779@gmail.com
- **Portfolio:** [https://www.maheshlangote.online](https://www.maheshlangote.online)

Don't hesitate to reach out if you need any assistance or have feedback about StoryForge!

---
