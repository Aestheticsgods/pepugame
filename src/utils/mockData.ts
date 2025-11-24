import { Captain, Rarity } from '@/types/captain';

const rarities: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

const captainNames = [
  'Captain Thunder', 'Admiral Storm', 'Commander Blaze', 'Captain Frost',
  'Captain Shadow', 'Admiral Phoenix', 'Commander Steel', 'Captain Vortex',
  'Admiral Crimson', 'Commander Nova', 'Captain Eclipse', 'Admiral Titan',
  'Commander Surge', 'Captain Nebula', 'Admiral Quantum', 'Captain Zenith',
  'Admiral Omega', 'Commander Apex', 'Captain Horizon', 'Admiral Cosmos'
];

const generateRandomStats = (rarity: Rarity) => {
  const baseMultiplier = {
    common: 1,
    uncommon: 1.2,
    rare: 1.5,
    epic: 1.8,
    legendary: 2.2,
  }[rarity];

  return {
    power: Math.floor((Math.random() * 40 + 30) * baseMultiplier),
    flare: Math.floor((Math.random() * 40 + 30) * baseMultiplier),
    defense: Math.floor((Math.random() * 40 + 30) * baseMultiplier),
    instinct: Math.floor((Math.random() * 40 + 30) * baseMultiplier),
    luck: Math.floor((Math.random() * 40 + 30) * baseMultiplier),
    leadership: Math.floor((Math.random() * 40 + 30) * baseMultiplier),
  };
};

// Use only the two specific images from public folder
const getCharacterImage = (index: number) => {
  // Alternate between the two images
  if (index % 2 === 0) {
    return '/captain-frog.jpg';
  } else {
    return '/WhatsApp Image 2025-11-17 at 03.24.43_e2cb42d2.jpg';
  }
};

export const generateMockCaptains = (count: number = 20): Captain[] => {
  return Array.from({ length: count }, (_, i) => {
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    
    return {
      id: `captain-${i}`,
      tokenId: i,
      name: `${captainNames[i % captainNames.length]}`,
      image: getCharacterImage(i),
      rarity,
      stats: generateRandomStats(rarity),
      owner: '0x0000000000000000000000000000000000000000',
    };
  });
};
