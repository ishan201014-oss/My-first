import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { generatePrompts, users } from '../lib/sample-prompts';

const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!raw) throw new Error('Set FIREBASE_SERVICE_ACCOUNT to the JSON service account string before running npm run seed.');
if (!getApps().length) initializeApp({ credential: cert(JSON.parse(raw)) });
const db = getFirestore();
const prompts = generatePrompts(100);

async function main() {
  let batch = db.batch();
  let writes = 0;
  for (const user of users) {
    batch.set(db.collection('users').doc(user.uid), { ...user, createdAt: Timestamp.fromDate(new Date(user.createdAt)), updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    writes++;
  }
  for (const prompt of prompts) {
    batch.set(db.collection('prompts').doc(prompt.id), { ...prompt, createdAt: Timestamp.fromDate(new Date(prompt.createdAt)), updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    writes++;
    if (writes === 450) { await batch.commit(); batch = db.batch(); writes = 0; }
  }
  if (writes) await batch.commit();
  console.log(`Seeded ${users.length} users and ${prompts.length} prompts.`);
}
main().catch((error) => { console.error(error); process.exit(1); });
