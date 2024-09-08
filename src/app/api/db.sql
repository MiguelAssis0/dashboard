CREATE DATABASE dashboard
    WITH ENCODING = 'UTF8'
    LC_COLLATE = 'pt_BR.UTF-8'
    LC_CTYPE = 'pt_BR.UTF-8'
    TEMPLATE = template0;

CREATE TABLE usuario(
    uid SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome_cliente VARCHAR(255) NOT NULL,
    email_cliente VARCHAR(255) UNIQUE NOT NULL,
    telefone_cliente VARCHAR(20)
);

CREATE TABLE trabalhos (
    idt SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    paleta_cores VARCHAR(255),
    fontes VARCHAR(255),
    prazo DATE NOT NULL,
    lucro NUMERIC(10, 2),
    situacao VARCHAR(50) NOT NULL,
    id_cliente INT REFERENCES cliente(id_cliente) ON DELETE CASCADE
);

CREATE TABLE qtde_trabalhos_concluidos (
    id_qtc SERIAL PRIMARY KEY,
    qtde INTEGER NOT NULL,
    lucro_total NUMERIC(10, 2),
    total_clientes INTEGER NOT NULL,
    uid INT REFERENCES usuario(uid) ON DELETE CASCADE
);

CREATE TABLE pagamentos (
    id_pagamento SERIAL PRIMARY KEY,
    valor NUMERIC(10, 2) NOT NULL,
    data_pagamento DATE NOT NULL,
    id_trabalho INT REFERENCES trabalhos(idt) ON DELETE CASCADE
);
