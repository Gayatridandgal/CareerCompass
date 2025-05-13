# CareerCompass 
AI-Powered Career Guidance Platform


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Running Genkit Locally](#running-genkit-locally)
  - [Building for Production](#building-for-production)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [AI Integration with Genkit](#ai-integration-with-genkit)

## Introduction

CareerCompass is a modern web application designed to help individuals navigate their career paths using AI-driven insights. Users can take a survey about their interests, skills, and aspirations, and the application will provide personalized career suggestions, including potential roles, learning resources, and industry trends.

This project leverages Next.js for the frontend and Firebase Genkit for AI-powered backend functionalities, providing a seamless and intelligent user experience.

## Features

- **Personalized Career Survey:** An intuitive survey to gather user preferences, skills, and career goals.
- **AI-Powered Recommendations:** Utilizes Google's Gemini model via Genkit to analyze survey responses and suggest suitable career paths.
- **Detailed Career Insights:** Provides information about suggested careers, including typical responsibilities, salary expectations (future enhancement), and required skills.
- **Resource Matching:** Suggests relevant courses, articles, and tools for skill development (future enhancement).
- **Modern, Responsive UI:** Built with Next.js, TypeScript, and ShadCN UI components for a clean and accessible user experience on all devices.
- **Server-Side Logic with Genkit Flows:** AI interactions are handled by robust Genkit flows, ensuring efficient and scalable processing.


## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Google Cloud Project](https://console.cloud.google.com/) with the Vertex AI API enabled.

### Environment Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Gayatridandgal/CareerCompass.git
    cd CareerCompass
    ```

2.  **Create a `.env` file** in the root of the project and add your Firebase and Google Cloud credentials.
    Specifically, you'll need to configure Google AI for Genkit. Refer to the [Genkit Google AI documentation](https://firebase.google.com/docs/genkit/plugins#google-ai) for details on setting up authentication. Typically, this involves:
    *   Enabling the Vertex AI API in your Google Cloud project.
    *   Setting up Application Default Credentials (ADC) by running:
        ```bash
        gcloud auth application-default login
        ```
    *   Ensuring your `.env` file (or environment) has `GOOGLE_API_KEY` if you are using the Gemini API directly (though Genkit with Vertex AI often relies on ADC). For Vertex AI, ensure your `GCLOUD_PROJECT` is set.

    Example `.env` (adapt as needed):
    ```env
    # If using direct Gemini API key (less common with Vertex AI setup)
    # GOOGLE_API_KEY=your_google_api_key

    # Ensure your gcloud CLI is configured with the correct project
    # and you've run `gcloud auth application-default login`.
    # Genkit will typically pick up the project from ADC.
    ```

### Installation

Install the project dependencies:

```bash
npm install
# or
yarn install
```

### Running the Development Server

To run the Next.js development server:

```bash
npm run dev
# or
yarn dev
```

The application will typically be available at `http://localhost:9002`.

### Running Genkit Locally

Genkit flows are an integral part of this application. To run the Genkit development environment (which allows you to test and inspect flows):

```bash
npm run genkit:dev
# or for auto-reloading on changes:
npm run genkit:watch
```

This will start the Genkit developer UI, usually at `http://localhost:4000`. You can use this UI to invoke and debug your AI flows.

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## Technologies Used

- **Frontend:**
  - [Next.js](https://nextjs.org/) (v15.x with App Router)
  - [React](https://reactjs.org/) (v18.x)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [ShadCN UI](https://ui.shadcn.com/) (Component Library)
  - [Lucide React](https://lucide.dev/) (Icons)
- **AI / Backend Logic:**
  - [Firebase Genkit](https://firebase.google.com/docs/genkit)
  - [Google AI (Gemini Models via Genkit)](https://ai.google.dev/)
- **Linting & Formatting:**
  - ESLint (configured with Next.js)
  - Prettier (recommended, not explicitly configured in `package.json` scripts but good practice)
- **Version Control:**
  - Git & GitHub

## Project Structure

A brief overview of the key directories:

```
CareerCompass/
├── src/
│   ├── app/                  # Next.js App Router: pages, layouts, API routes
│   │   ├── survey/           # Survey related pages and components
│   │   └── ...
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # ShadCN UI components
│   │   └── survey/           # Survey-specific components
│   ├── ai/                   # Genkit related files
│   │   ├── flows/            # Genkit flow definitions (e.g., survey processing)
│   │   ├── genkit.ts         # Genkit global configuration
│   │   └── dev.ts            # Genkit development server entry point
│   ├── lib/                  # Utility functions
│   ├── hooks/                # Custom React hooks
│   └── ...
├── public/                   # Static assets
├── .env                      # Environment variables (ignored by Git)
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies and scripts
```

## AI Integration with Genkit

This application uses Firebase Genkit to power its AI features. Key aspects include:

- **Genkit Flows:** Defined in `src/ai/flows/`, these server-side functions orchestrate calls to AI models (like Gemini) and can include other business logic. For example, `src/ai/flows/career-suggestion-flow.ts` might handle taking survey data and returning career suggestions.
- **Schema Definition:** Zod is used to define input and output schemas for Genkit flows, ensuring type safety and clear data contracts.
- **Model Configuration:** The `src/ai/genkit.ts` file configures the AI models to be used (e.g., `googleai/gemini-2.0-flash`).
- **Server Actions:** Next.js Server Actions are used to invoke Genkit flows from client components securely and efficiently without needing to create separate API endpoints.

The `careerSuggestionFlow` (example name) likely takes user inputs from the survey, constructs a prompt for the Gemini model, and processes the model's output to generate structured career advice.

Happy Hacking! We hope CareerCompass helps many find their ideal career path.

