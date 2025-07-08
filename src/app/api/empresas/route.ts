import { NextResponse } from 'next/server';
import db from "@/db/index";
import { empresas } from '@/db/schema';

export async function GET() {
  const all = await db.select().from(empresas);
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  const body = await req.json();

  const nova = await db.insert(empresas).values({
    razaoSocial: body.razaoSocial,
    cnpj: body.cnpj,
    cep: body.cep,
    cidade: body.cidade,
    estado: body.estado,
    bairro: body.bairro,
    complemento: body.complemento,
  });

  return NextResponse.json(nova);
}
