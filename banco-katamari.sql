CREATE DATABASE banco_katamari;

USE banco_katamari;

CREATE TABLE pessoas(
	pessoa_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cep VARCHAR(11) NOT NULL,
    limite_credito INTEGER DEFAULT 0,
    observacao TEXT,
    data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE enderecos(
	endereco_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cep VARCHAR(11) NOT NULL,
    logradouro VARCHAR(256) DEFAULT NULL,
    complemento VARCHAR(256) DEFAULT NULL,
    bairro VARCHAR(256) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    id_da_pessoa INTEGER NOT NULL,
    CONSTRAINT endereco_pessoa FOREIGN KEY (id_da_pessoa) REFERENCES pessoas(pessoa_id)
);

CREATE TABLE pessoas_fisicas (
	pessoa_fisica_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    id_da_pessoa INTEGER NOT NULL,
    CONSTRAINT pessoa_fisica_pessoa FOREIGN KEY (id_da_pessoa) REFERENCES pessoas(pessoa_id)
);

CREATE TABLE pessoas_juridicas(
	pessoa_juridica_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    razao_social VARCHAR(150) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    id_da_pessoa INTEGER NOT NULL,
    CONSTRAINT pessoa_juridica_pessoa FOREIGN KEY (id_da_pessoa) REFERENCES pessoas(pessoa_id)
);

/* Contas  */
CREATE TABLE contas(
	conta_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    saldo INTEGER DEFAULT 0,
    numero_da_conta INTEGER NOT NULL,
    id_da_pessoa INTEGER NOT NULL,
    CONSTRAINT conta_pessoa FOREIGN KEY (id_da_pessoa) REFERENCES pessoas(pessoa_id)
);

CREATE TABLE contas_corrente(
	conta_corrente_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    limite INTEGER DEFAULT 0,
    numero_da_conta INTEGER NOT NULL,
    id_da_conta INTEGER NOT NULL,
    CONSTRAINT contas_conta_corrente FOREIGN KEY (id_da_conta) REFERENCES contas(conta_id)
);

CREATE TABLE contas_poupanca(
	conta_poupanca_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    rendimento INTEGER DEFAULT 5,
    numero_da_conta INTEGER NOT NULL,
    id_da_conta INTEGER NOT NULL,
    CONSTRAINT contas_conta_poupanca FOREIGN KEY (id_da_conta) REFERENCES contas(conta_id)
);