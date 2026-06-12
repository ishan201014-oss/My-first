import type { Metadata } from 'next';
import { SubmitForm } from '@/components/submit-form';
export const metadata: Metadata = { title: 'Submit a Prompt' };
export default function SubmitPage() { return <main className="px-4 py-14"><SubmitForm /></main>; }
