"use server";
import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Todos os campos são obrigatórios!' }, { status: 400 });
        }

        const sql = neon('postgresql://neondb_owner:wiVXC08jLhrx@ep-dawn-mode-a5pv3ntx.us-east-2.aws.neon.tech/neondb?sslmode=require');

        const userResult = await sql`
            SELECT * FROM usuario WHERE email = ${email}
        `;

        if (userResult.length === 0) {
            return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
        }

        const user = userResult[0].senha;

        const isPasswordValid = await compare(password, user);

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Senha inválida' }, { status: 401 });
        }

        return NextResponse.json({
            message: "Logado com sucesso!",
            user: {
                uid: user.uid,
                nome: user.nome,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Erro ao fazer login: ", error);
        return NextResponse.json({ message: "Erro ao fazer login" }, { status: 500 });
    }
}
