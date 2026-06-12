import type { Category } from './types';
import { BadgeCheck, Camera, Clapperboard, Gamepad2, Image, Joystick, Mountain, Palette, Sparkles, Wand2 } from 'lucide-react';

export const categories: { name: Category; description: string; iconName: string; gradient: string }[] = [
  { name: 'Anime', description: 'Stylized characters, scenes, and manga covers.', iconName: 'Sparkles', gradient: 'from-pink-500 to-purple-500' },
  { name: 'Fantasy', description: 'Mythic kingdoms, creatures, and magical worlds.', iconName: 'Wand2', gradient: 'from-purple-500 to-indigo-500' },
  { name: 'Realistic', description: 'Photorealistic portraits, products, and lifestyles.', iconName: 'BadgeCheck', gradient: 'from-blue-500 to-cyan-400' },
  { name: 'Minecraft', description: 'Voxel builds, biomes, skins, and blocky adventures.', iconName: 'Mountain', gradient: 'from-emerald-500 to-lime-400' },
  { name: 'Logos', description: 'Brand marks, icons, emblems, and identity systems.', iconName: 'Palette', gradient: 'from-fuchsia-500 to-blue-500' },
  { name: 'Wallpapers', description: 'Mobile, desktop, abstract, and cinematic backgrounds.', iconName: 'Image', gradient: 'from-sky-500 to-violet-500' },
  { name: 'Gaming', description: 'Characters, UI key art, environments, and loot.', iconName: 'Gamepad2', gradient: 'from-orange-500 to-pink-500' },
  { name: 'Photography', description: 'Camera-ready scenes with lens and lighting language.', iconName: 'Camera', gradient: 'from-cyan-400 to-blue-600' },
  { name: 'Cinematic', description: 'Movie-grade frames, posters, lighting, and mood.', iconName: 'Clapperboard', gradient: 'from-amber-400 to-red-500' },
  { name: 'Sci-Fi', description: 'Future cities, starships, cybernetics, and alien worlds.', iconName: 'Joystick', gradient: 'from-blue-500 to-purple-600' },
];

export const categoryNames = categories.map((category) => category.name);
export const iconMap = { BadgeCheck, Camera, Clapperboard, Gamepad2, Image, Joystick, Mountain, Palette, Sparkles, Wand2 };
