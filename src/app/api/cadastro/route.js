import { NextResponse } from "next/server";

export default async function POST(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "As senhas precisam ser iguais" });
    }

    

}