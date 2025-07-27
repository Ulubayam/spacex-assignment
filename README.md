# SpaceX Launches Dashboard

A modern web application that displays SpaceX launch data in an interactive dashboard. Built with React, TypeScript, Vite, and Material-UI.

## ✨ Features

- 🚀 View all recent SpaceX launches
- 📊 Interactive charts showing launch statistics
- 🔍 Filter and search launches
- 📱 Responsive design that works on all devices
- ⚡ Fast and efficient data loading with GraphQL

## 🛠 Technologies Used

- React 19
- TypeScript
- Vite
- Material-UI (MUI)
- GraphQL with graphql-request
- Recharts for data visualization

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ulubayam/spacex-assignment.git
   cd spacex-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📂 Project Structure

```
src/
├── api/               # API calls and GraphQL queries
├── assets/            # Static assets like images and fonts
├── components/        # Reusable UI components
│   ├── LaunchChart/   # Chart components for launch data
│   └── LaunchList/    # List view of launches
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and helpers
├── theme/             # MUI theme configuration
├── types/             # TypeScript type definitions
└── utils/             # Additional utility functions
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📊 Data Source

This application uses the public [SpaceX GraphQL API](https://studio.apollographql.com/public/SpaceX-pxxbxen/variant/current/home) to fetch launch data.
