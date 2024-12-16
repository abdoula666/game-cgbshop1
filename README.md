# Lucky Wheel Game - CGBShop1

A fun and interactive game collection featuring Lucky Wheel, Snake Game, and Thimbles Game for CGBShop1 users.

## Features

- Lucky Wheel with African flags
- Snake Game with African fruits
- Thimbles Game
- Points system with levels
- Referral system
- Sound effects
- Mobile-responsive design

## Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/lucky-wheel-game.git
cd lucky-wheel-game
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example`
```bash
cp .env.example .env
```

4. Add your WooCommerce credentials to `.env`

5. Start development server
```bash
npm run dev
```

## Environment Variables

The following environment variables are required:

- `VITE_WOOCOMMERCE_URL`: Your WooCommerce API URL
- `VITE_CONSUMER_KEY`: Your WooCommerce consumer key
- `VITE_CONSUMER_SECRET`: Your WooCommerce consumer secret

## Deployment

The project is automatically deployed to GitHub Pages when pushing to the main branch.

To deploy manually:

1. Build the project
```bash
npm run build
```

2. Deploy to GitHub Pages
```bash
npm run deploy
```

## Security

- API keys are stored in environment variables
- Authentication is required to play games
- Only registered CGBShop1 users can participate

## License

This project is private and proprietary. All rights reserved.
