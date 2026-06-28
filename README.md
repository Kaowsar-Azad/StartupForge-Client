# StartupForge - Client

StartupForge is a platform that connects startup founders with professionals (developers, designers, marketers) to build teams. This repository contains the frontend client application built with Next.js.

## Overview

The frontend is built using Next.js and Tailwind CSS. It provides interfaces for different user roles including Founders, Collaborators, and Admins. It interacts with the backend REST API to fetch data and handle authentication state.

## Features

- Role-based dashboards (Admin, Founder, Collaborator)
- Credential and Google OAuth authentication using Better Auth
- Stripe checkout integration for premium founder features
- Responsive layout using Tailwind CSS
- Client-side routing and protected routes
- Image uploading to ImgBB

## Technologies Used

- Next.js (App Router)
- React
- Tailwind CSS
- Better Auth
- Axios
- Framer Motion
- React Toastify
- Stripe Checkout
- Gravity UI Icons

## Prerequisites

- Node.js installed
- Access to the StartupForge Server API

## Setup Instructions

1. Clone the repository and navigate into the directory:
   ```bash
   cd StartupForge-Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will start running on `http://localhost:3000`.
