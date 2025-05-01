'use server';

import { prisma } from '@/lib/prisma'; // putanja do vašeg Prisma klijenta

export async function createUser(formData: FormData) {
  const title = formData.get('title');


  if (!title ) {
    return { error: 'Title are required.' };
  }

  const newUser = await prisma.todo.create({
    data: {
      title: title as string,
      priority: 1, // Replace with appropriate numeric value for priority
      details: 'neki', // Replace with appropriate default or dynamic value
    },
  });

  // Opcionalno: revalidacija puta nakon izmjene podataka
  // revalidatePath('/users');

  return newUser;
}