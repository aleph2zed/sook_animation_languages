import { redirect } from 'next/navigation';

/**
 * Root page redirects to the intro demo
 */
export default function Home() {
  redirect('/intro');
}


