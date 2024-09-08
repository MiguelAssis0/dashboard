import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { neon } from '@neondatabase/serverless';

export async function POST(req) {
    try {
        const { nome, email, password, confirmPassword } = await req.json();

        if (!nome || !email || !password || !confirmPassword) {
            return NextResponse.json({ message: 'Todos os campos são obrigatórios!' }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ message: 'As senhas não coincidem!' }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);

        const sql = neon(process.env.DATABASE_URL);

        const verifyUser = sql`
            SELECT * FROM usuario WHERE email = ${email}`

        if(verifyUser.length > 0) {
            return NextResponse.json({ message: 'Esse email ja está sendo utilizado!' }, { status: 400 });
        }

        await sql`
            INSERT INTO usuario (nome, email, senha) 
            VALUES (${nome}, ${email}, ${hashedPassword})
        `;

        const user = await sql`SELECT * FROM usuario WHERE email = ${email}`;

        if (user.length === 0) {
            return NextResponse.json({ message: 'Erro ao buscar usuário.' }, { status: 500 });
        }

        return NextResponse.json({
            message: "Cadastrado com sucesso!",
            user: {
                uid: user[0].uid,
                nome: user[0].nome,
                email: user[0].email
            }
        });
    } catch (error) {
        console.error("Erro ao cadastrar usuário: ", error);
        return NextResponse.json({ message: "Erro ao cadastrar usuário" }, { status: 500 });
    }
}
