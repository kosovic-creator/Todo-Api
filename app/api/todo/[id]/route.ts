import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split('/').pop() || '', 10);

  if (!id) {
    return NextResponse.json({ error: 'ID nije prosleđen.' }, { status: 400 });
  }

  const { title, priority,details, done } = await request.json();

  const todo = await prisma.todo.update({
    where: { id },
    data: { title, priority,details, done },
  });

  return NextResponse.json(todo);
}


export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split('/').pop() || '', 10); // izvlači ID iz URL-a i parsira ga u broj

  if (!id) {
    return NextResponse.json({ message: 'ID nije prosleđen.' }, { status: 400 });
  }

  await prisma.todo.delete({ where: { id } }); // koristi parsirani broj
  return NextResponse.json({ message: 'Deleted' });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = parseInt(idString, 10);



  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
  }

  return NextResponse.json(todo);
}