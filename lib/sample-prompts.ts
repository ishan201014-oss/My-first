import type { Category, Prompt, UserProfile } from './types';

const categorySeeds: Record<Category, { subjects: string[]; styles: string[]; details: string[]; tags: string[] }> = {
  Anime: { subjects: ['celestial shrine maiden', 'cyberpunk ronin', 'academy mage', 'mecha pilot', 'moonlit idol'], styles: ['clean anime key visual', 'manga splash page', 'Studio-quality illustration', 'soft pastel anime', 'dramatic shonen poster'], details: ['expressive eyes', 'dynamic wind', 'cherry blossom particles', 'rim lighting', 'detailed outfit layers'], tags: ['anime', 'manga', 'character', 'stylized'] },
  Fantasy: { subjects: ['dragon citadel', 'elven oracle', 'enchanted forest gate', 'dwarven forge', 'floating wizard tower'], styles: ['epic fantasy concept art', 'storybook realism', 'high-detail matte painting', 'mythic oil-paint style', 'tabletop campaign cover'], details: ['ancient runes', 'volumetric mist', 'golden hour', 'magical particles', 'ornate armor'], tags: ['fantasy', 'magic', 'worldbuilding', 'epic'] },
  Realistic: { subjects: ['editorial portrait', 'luxury product shot', 'urban fashion model', 'chef in a modern kitchen', 'architectural interior'], styles: ['photorealistic', 'commercial photography', 'documentary realism', '8k editorial', 'natural light photography'], details: ['85mm lens', 'softbox reflection', 'true skin texture', 'cinematic color grade', 'shallow depth of field'], tags: ['realistic', 'photo', 'portrait', 'commercial'] },
  Minecraft: { subjects: ['survival base', 'nether fortress', 'mountain village', 'redstone laboratory', 'enchanted biome'], styles: ['voxel render', 'blocky isometric scene', 'Minecraft-inspired key art', 'chunky low-poly world', 'game screenshot aesthetic'], details: ['glowing blocks', 'square clouds', 'biome depth', 'cozy torches', 'inventory props'], tags: ['minecraft', 'voxel', 'blocks', 'game'] },
  Logos: { subjects: ['AI startup mark', 'coffee brand emblem', 'gaming clan logo', 'eco-tech symbol', 'luxury monogram'], styles: ['minimal vector logo', 'premium brand identity', 'geometric icon system', 'bold mascot mark', 'flat scalable design'], details: ['negative space', 'balanced kerning', 'two-color palette', 'high contrast', 'brand guidelines ready'], tags: ['logo', 'branding', 'vector', 'identity'] },
  Wallpapers: { subjects: ['neon mountain valley', 'abstract glass waves', 'deep space nebula', 'rainy cyber street', 'calm ocean sunrise'], styles: ['4k wallpaper', 'ultra-wide background', 'minimal gradient art', 'cinematic environment', 'glossy abstract render'], details: ['no text', 'high contrast', 'desktop composition', 'mobile safe center', 'vibrant glow'], tags: ['wallpaper', 'background', '4k', 'aesthetic'] },
  Gaming: { subjects: ['legendary loot chest', 'battle royale hero', 'fantasy boss arena', 'racing garage', 'RPG inventory screen'], styles: ['AAA game key art', 'stylized game illustration', 'high-energy promo art', 'UI concept render', 'esports splash art'], details: ['dramatic pose', 'particle effects', 'readable silhouette', 'color-coded rarity', 'action lighting'], tags: ['gaming', 'esports', 'character', 'key art'] },
  Photography: { subjects: ['street market at dawn', 'wildlife close-up', 'minimal product desk', 'travel portrait', 'rain-soaked alley'], styles: ['35mm photography', 'award-winning photojournalism', 'macro photography', 'cinematic street photo', 'natural documentary style'], details: ['realistic grain', 'balanced exposure', 'authentic shadows', 'lens compression', 'decisive moment'], tags: ['photography', 'camera', 'real', 'lens'] },
  Cinematic: { subjects: ['detective under neon rain', 'desert chase scene', 'spaceship hangar reveal', 'lonely astronaut', 'royal coronation hall'], styles: ['cinematic still', 'anamorphic film frame', 'movie poster lighting', 'high-budget production design', 'dramatic storyboard frame'], details: ['letterbox composition', 'volumetric light', 'teal orange grade', 'strong foreground', '35mm film grain'], tags: ['cinematic', 'film', 'movie', 'lighting'] },
  'Sci-Fi': { subjects: ['orbital megacity', 'android botanist', 'alien marketplace', 'quantum engine room', 'terraforming rover'], styles: ['hard sci-fi concept art', 'futuristic matte painting', 'cybernetic design sheet', 'space opera poster', 'sleek industrial render'], details: ['holographic UI', 'alien materials', 'blue neon reflections', 'scale cues', 'advanced machinery'], tags: ['sci-fi', 'future', 'space', 'cyberpunk'] },
};

export const users: UserProfile[] = [
  { uid: 'nova-admin', username: 'Nova Curator', email: 'nova@prompthub.ai', avatar: 'https://api.dicebear.com/9.x/shapes/svg?seed=Nova', role: 'admin', bio: 'Editorial lead for cinematic prompt systems.', followers: 12840, following: 96, badges: ['Founder', 'Top Curator'], createdAt: '2025-01-07T10:00:00.000Z' },
  { uid: 'pixelmage', username: 'PixelMage', email: 'pixelmage@example.com', avatar: 'https://api.dicebear.com/9.x/shapes/svg?seed=PixelMage', role: 'user', bio: 'Anime, voxel worlds, and luminous fantasy ideas.', followers: 6820, following: 143, badges: ['Anime Pro'], createdAt: '2025-02-12T10:00:00.000Z' },
  { uid: 'lenscraft', username: 'LensCraft', email: 'lens@example.com', avatar: 'https://api.dicebear.com/9.x/shapes/svg?seed=LensCraft', role: 'user', bio: 'Realistic prompt engineer focused on lens language.', followers: 5310, following: 88, badges: ['Photo Expert'], createdAt: '2025-03-18T10:00:00.000Z' },
  { uid: 'brandforge', username: 'BrandForge', email: 'brand@example.com', avatar: 'https://api.dicebear.com/9.x/shapes/svg?seed=BrandForge', role: 'user', bio: 'Logo systems and brand-ready AI art prompts.', followers: 4130, following: 77, badges: ['Brand Master'], createdAt: '2025-04-22T10:00:00.000Z' }
];

function makePrompt(category: Category, index: number): Prompt {
  const seed = categorySeeds[category];
  const subject = seed.subjects[index % seed.subjects.length];
  const style = seed.styles[(index * 2) % seed.styles.length];
  const detailA = seed.details[(index * 3) % seed.details.length];
  const detailB = seed.details[(index * 5 + 1) % seed.details.length];
  const author = users[(index + category.length) % users.length];
  const dayOffset = (index + category.length * 9) % 220;
  const createdAt = new Date(Date.now() - dayOffset * 86400000 - index * 3600000).toISOString();
  return {
    id: `${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${String(index + 1).padStart(3, '0')}`,
    title: `${category} ${subject.replace(/\b\w/g, (m) => m.toUpperCase())} Prompt ${index + 1}`,
    content: `Create a ${style} of a ${subject}, featuring ${detailA} and ${detailB}. Use premium composition, crisp subject separation, rich atmospheric depth, coherent anatomy or geometry, high-resolution detail, balanced negative space, and a polished production finish. Add subtle neon purple and blue accents where appropriate, avoid artifacts, avoid extra limbs, avoid unreadable text, and optimize for image generation models with descriptive visual hierarchy.`,
    category,
    authorId: author.uid,
    authorName: author.username,
    likes: 24 + ((index * 37 + category.length * 11) % 980),
    favorites: 8 + ((index * 23 + category.length * 7) % 420),
    views: 250 + ((index * 197 + category.length * 53) % 15000),
    tags: Array.from(new Set([...seed.tags, subject.split(' ')[0], style.split(' ')[0].toLowerCase()])),
    createdAt,
    featured: index % 17 === 0,
    promptOfDay: category === 'Fantasy' && index === 0,
  };
}

export function generatePrompts(countPerPrimaryCategory = 100): Prompt[] {
  const primary: Category[] = ['Anime', 'Fantasy', 'Realistic', 'Minecraft', 'Wallpapers', 'Logos'];
  const secondary: Category[] = ['Gaming', 'Photography', 'Cinematic', 'Sci-Fi'];
  return [
    ...primary.flatMap((category) => Array.from({ length: countPerPrimaryCategory }, (_, index) => makePrompt(category, index))),
    ...secondary.flatMap((category) => Array.from({ length: 30 }, (_, index) => makePrompt(category, index))),
  ];
}

export const samplePrompts = generatePrompts();
