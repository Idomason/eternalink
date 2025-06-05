# EternaLink

EternaLink is a platform that connects generations through meaningful activities, fostering deep relationships between elderly individuals and the younger generation.

## Mission

EternaLink exists to restore lost purpose and joy to the lives of elderly individuals and their concerned relatives by fostering deep, meaningful connections and engagement between generations.

## Vision

To create a world where every elderly person feels seen, valued, and connected through meaningful intergenerational relationships that honor the past and shape the future.

## Features

- User Authentication (Elder / Caregiver / Volunteer)
- Event Management
- Event Booking System
- Payment Integration (Mobile Money)
- User Dashboard
- Skill Sharing Platform

## Tech Stack

- Frontend: Next.js, React, TailwindCSS
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- Authentication: JWT
- Payment: Mobile Money Integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/eternalink.git
cd eternalink
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Set up environment variables:

   - Create `.env` file in the backend directory
   - Create `.env.local` file in the frontend directory

5. Start the development servers:

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

## Project Structure

```
eternalink/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── utils/
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   ├── lib/
    │   └── styles/
    ├── public/
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries, please contact us at [contact@eternalink.com](mailto:contact@eternalink.com)
