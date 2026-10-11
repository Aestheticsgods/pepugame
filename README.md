# PepuGame

A browser-based PepuStars card-game interface with a landing screen, captain artwork, deck and battle views, and a MetaMask connection component.

**Live preview:** [pepugame.vercel.app](https://pepugame.vercel.app)  
**Repository:** [Aestheticsgods/pepugame](https://github.com/Aestheticsgods/pepugame)

## Included in this repository

- Captain cards, game hand, deck grid and battlefield components
- Wallet connection interface and Wagmi configuration
- Sample captain and game data for the client experience
- Responsive styling and animated background effects

This repository contains the client application and sample data. It does not include audited smart contracts or establish that on-chain game actions are available.

## Technology

- React and TypeScript
- Vite
- Tailwind CSS and shadcn/ui components
- Wagmi, Viem and RainbowKit
- Zustand and Framer Motion

## Run locally

Requirements: Node.js and npm.

```bash
git clone https://github.com/Aestheticsgods/pepugame.git
cd pepugame
npm install
npm run dev
```

Use `npm run build` to create a production build and `npm run lint` to run the configured lint check.

## Project layout

```text
src/
  components/   Captain cards, deck, hand, battlefield and wallet UI
  config/       Wallet connection configuration
  pages/        Main game interface
  store/        Client-side game state
  types/        Captain data types
  utils/        Character images and sample data
```
