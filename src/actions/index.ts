'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({ where: { id }, data: { code } });
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  redirect('/');
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  //   check the user's inputs and make sure they're valid
  const title = formData.get('title');
  const code = formData.get('code');

  if (typeof title !== 'string' || title.length < 3) {
    return {
      message: 'Title must be longer',
    };
  }

  if (typeof code !== 'string' || code.length < 10) {
    return {
      message: 'Code must be longer',
    };
  }
  // create a new record in the database
  const snippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });

  console.log('snippet', snippet);

  // redirect to /snippets
  redirect('/');
}
