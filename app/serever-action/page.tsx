'use client';
import { createUser } from '@/./lib/actions/todo';
import { useRouter } from 'next/navigation';

export default function UserForm() {
    const router = useRouter();
  return (
    <form action={(formData) => createUser(formData).then(() => {
        router.push('/todo');
      })}>
      <input name="title" type="text" placeholder="Ime" />

      <button type="submit">Kreiraj korisnika</button>
    </form>
  );
}
// Ovaj kod predstavlja formu koja koristi server action za kreiranje korisnika.