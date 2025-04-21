BlueMap React Application
A modern React-based mapping application using Mapbox GL JS, TypeScript, and Tailwind CSS.

Prerequisites
Node.js (>=18.x)
npm or yarn
Mapbox API token
Setup
Clone the repository:
bash

Copy
git clone <repository-url>
cd bluemap
Install dependencies:
bash

Copy
npm install
Create a .env file in the root directory and add your Mapbox token:
bash

Copy
VITE_MAPBOX_TOKEN=your_mapbox_token_here
Place your image assets in the public/ directory.
Development
Run the development server:

bash

Copy
npm run dev
The application will be available at http://localhost:5173.

Build
Create a production build:

bash

Copy
npm run build

Project Structure
src/: Source code
components/: Reusable React components
App.tsx: Main application component
main.tsx: Entry point
index.css: Global styles
public/: Static assets (images, etc.)
.env: Environment variables
vite.config.ts: Vite configuration
tailwind.config.js: Tailwind CSS configuration

Features
Interactive Mapbox GL JS map
Custom markers for beaches, landmarks, warnings, and HQ
Popups with images and information
Toggleable area layer
Responsive design
Preloader animation
Type-safe TypeScript implementation
Secure environment variable handling

Security Considerations
Mapbox API token is stored in environment variables
No sensitive data is hardcoded
Uses HTTPS for external resources
Regular dependency updates recommended
Input sanitization for popup content
Maintenance
Keep dependencies updated (npm update)
Run linting: npm run lint
Monitor Mapbox API usage
Regularly backup image assets
Maintain documentation for new features