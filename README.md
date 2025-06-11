# Chat Next.js POC

This is a proof-of-concept (POC) for a video conferencing application built with modern web technologies. It leverages Next.js for the frontend framework, Stream for real-time video and chat, and Clerk for seamless user authentication.

## ✨ Features

*   **User Authentication**: Secure sign-up and sign-in functionality powered by Clerk.
*   **Instant Meetings**: Create new video meetings with a single click.
*   **Join Meetings**: Easily join existing meetings using a meeting link.
*   **Video Room**: A complete meeting interface with controls for camera and microphone.
*   **Responsive Design**: A user-friendly interface that works on both desktop and mobile devices.
*   **Upcoming Features**:
    *   Schedule meetings for a future date and time.
    *   View recordings of past meetings.

## 🚀 Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) 15 (with App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Authentication**: [Clerk](https://clerk.com/)
*   **Video & Chat API**: [Stream](https://getstream.io/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later recommended)
*   pnpm (or your preferred package manager like npm or yarn)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/chat-next-poc.git
    cd chat-next-poc
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the necessary environment variables. See the section below for more details.

    ```sh
    cp env_example .env.local
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

*   `NEXT_PUBLIC_STREAM_API_KEY`: Your public API key from the Stream dashboard.
*   `STREAM_SECRET_KEY`: Your secret key from the Stream dashboard.
*   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your publishable key from the Clerk dashboard.
*   `CLERK_SECRET_KEY`: Your secret key from the Clerk dashboard.

You can obtain these keys by creating an account on [Stream](https://getstream.io/) and [Clerk](https://clerk.com/).

## 📁 Project Structure

The project uses the Next.js App Router structure:

```
.
├── app/                        # Main application folder
│   ├── (auth)                  # Authentication pages (sign-in, sign-up)
│   ├── (root)/                 # Main authenticated layout and pages
│   │   └── page.tsx            # Home page
│   ├── api/                    # API routes
│   └── meeting/[id]/           # Dynamic route for meeting rooms
├── components/                 # Reusable React components
├── constants/                  # Application constants
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── providers/                  # Context providers (e.g., StreamClientProvider)
└── public/                     # Static assets
```

## 📜 Available Scripts

In the project directory, you can run:

*   `pnpm dev`: Runs the app in development mode.
*   `pnpm build`: Builds the app for production.
*   `pnpm start`: Starts a production server.
*   `pnpm lint`: Lints the codebase.