# React Job Tracker

A simple and intuitive job tracking application built with React. Keep track of your job applications, interviews, and career progress in one organized place.

## Features

- **Dashboard**: Overview of all your job applications
- **Add Jobs**: Easily add new job opportunities with details
- **Job Details**: View and manage individual job information
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean interface built with Tailwind CSS
- **Import/Export**: Backup and restore your job data

## Tech Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DUCANHTRA/react-job-tracker.git
cd react-job-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Import Sample Data

The application includes sample job data to help you get started:

1. **Sample Data Location**: `data/job-applications.json` in the root directory
2. **Import Process**:
   - Click the "Import" button in the header
   - Select the `job-applications.json` file from the `data/` folder
   - Confirm the import to replace your current data
   - The sample data includes 20+ job applications with various statuses

**Note**: Importing will replace your current job data. Make sure to export your existing data first if you want to keep it.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React Context for state management
├── data/          # Sample job data
├── pages/         # Application pages
└── utils/         # Utility functions
```

## Data Management

- **Export**: Save your job data as a JSON file for backup
- **Import**: Load previously exported data or sample data
- **Local Storage**: All data is automatically saved to your browser's local storage
- **Sample Data**: Use the included sample data to explore the application features

