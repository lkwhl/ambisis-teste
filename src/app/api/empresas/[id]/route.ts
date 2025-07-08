import { NextResponse } from 'next/server';
import db from '@/db/index';
import { empresas } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const data = await req.json();

  await db
    .update(empresas)
    .set({
      razaoSocial: data.razaoSocial,
      cnpj: data.cnpj,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
      bairro: data.bairro,
      complemento: data.complemento,
    })
    .where(eq(empresas.id, id));

  return NextResponse.json({ success: true });
}


export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });

  await db.delete(empresas).where(eq(empresas.id, id));

  return NextResponse.json({ success: true });
}