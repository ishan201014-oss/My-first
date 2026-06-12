'use client';

import { arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, increment, limit, orderBy, query, serverTimestamp, setDoc, startAfter, updateDoc, where, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { samplePrompts } from './sample-prompts';
import type { Category, Prompt } from './types';

function mapPrompt(data: DocumentData, id: string): Prompt {
  const created = data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString();
  return { id, title: data.title, content: data.content, category: data.category, authorId: data.authorId, authorName: data.authorName, likes: data.likes || 0, favorites: data.favorites || 0, views: data.views || 0, tags: data.tags || [], createdAt: created, featured: data.featured, promptOfDay: data.promptOfDay };
}

export async function fetchPrompts(options: { category?: Category | 'All'; sort?: string; pageSize?: number; cursor?: QueryDocumentSnapshot } = {}) {
  if (!isFirebaseConfigured || !db) return { prompts: samplePrompts.slice(0, options.pageSize || 48), cursor: undefined };
  const constraints = [];
  if (options.category && options.category !== 'All') constraints.push(where('category', '==', options.category));
  const sortField = options.sort === 'newest' ? 'createdAt' : options.sort === 'views' ? 'views' : 'likes';
  constraints.push(orderBy(sortField, 'desc'), limit(options.pageSize || 30));
  if (options.cursor) constraints.push(startAfter(options.cursor));
  const snap = await getDocs(query(collection(db, 'prompts'), ...constraints));
  return { prompts: snap.docs.map((d) => mapPrompt(d.data(), d.id)), cursor: snap.docs.at(-1) };
}

export async function getPrompt(id: string) {
  if (!isFirebaseConfigured || !db) return samplePrompts.find((prompt) => prompt.id === id) || null;
  const ref = doc(db, 'prompts', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  await updateDoc(ref, { views: increment(1) });
  return mapPrompt(snap.data(), snap.id);
}

export async function submitPrompt(prompt: Omit<Prompt, 'id' | 'likes' | 'favorites' | 'views' | 'createdAt'>) {
  if (!db) throw new Error('Firebase is not configured. Add environment variables to submit prompts.');
  const id = crypto.randomUUID();
  await setDoc(doc(db, 'prompts', id), { ...prompt, likes: 0, favorites: 0, views: 0, featured: false, createdAt: serverTimestamp() });
  return id;
}

export async function toggleLike(promptId: string, uid: string) {
  if (!db) throw new Error('Firebase is not configured.');
  const likeRef = doc(db, 'prompts', promptId, 'likesBy', uid);
  const snap = await getDoc(likeRef);
  if (snap.exists()) {
    await deleteDoc(likeRef);
    await updateDoc(doc(db, 'prompts', promptId), { likes: increment(-1) });
    return false;
  }
  await setDoc(likeRef, { uid, createdAt: serverTimestamp() });
  await updateDoc(doc(db, 'prompts', promptId), { likes: increment(1) });
  return true;
}

export async function toggleFavorite(promptId: string, uid: string) {
  if (!db) throw new Error('Firebase is not configured.');
  const userRef = doc(db, 'users', uid);
  const favRef = doc(db, 'users', uid, 'favorites', promptId);
  const snap = await getDoc(favRef);
  if (snap.exists()) {
    await deleteDoc(favRef);
    await updateDoc(doc(db, 'prompts', promptId), { favorites: increment(-1) });
    await updateDoc(userRef, { favoritePromptIds: arrayRemove(promptId) });
    return false;
  }
  await setDoc(favRef, { promptId, createdAt: serverTimestamp() });
  await updateDoc(doc(db, 'prompts', promptId), { favorites: increment(1) });
  await setDoc(userRef, { favoritePromptIds: arrayUnion(promptId) }, { merge: true });
  return true;
}
