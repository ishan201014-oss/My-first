import { writeFileSync, mkdirSync } from 'node:fs';
import { generatePrompts } from '../lib/sample-prompts';
mkdirSync('public/data', { recursive: true });
writeFileSync('public/data/prompts.json', JSON.stringify(generatePrompts(100), null, 2));
console.log('Exported prompts to public/data/prompts.json');
