//Arquivo que vai fazer o tratamento das informações pega do banco de dados e enviadas corretamente para a requisição
//Receber os dados do banco de dados para retornar do tipo cliente entity

import { ClientEntity } from "../../../../../domain/entities/clients/client.entity";
import { IPessoaEntity } from "../../../../../domain/entities/clients/pessoa.entity";
import { IPessoaFisicaEntity } from "../../../../../domain/entities/clients/pessoaFisica.entity";
import { IPessoaJuridicaEntity } from "../../../../../domain/entities/clients/pessoaJuridica.entity";

export default function (dados: any) {
    //Se não existir os dados que foi pedida, retorne
    if (!dados) {
        return
    }

    //'conversões'
    let cliente: IPessoaEntity = {
        pessoa_id: dados.pessoa_id,
        cep: dados.cep,
        limite_credito: dados.limite_credito,
        observacao: dados.observacao
    }

    if (dados.endereco) {
        cliente.endereco = {
            cep: dados.endereco.cep,
            logradouro: dados.endereco.logradouro,
            complemento: dados.endereco.complemento,
            bairro: dados.endereco.bairro,
            cidade: dados.endereco.cidade,
            estado: dados.endereco.estado
        }
    }

    if(dados.pessoaFisica){
        (cliente as IPessoaFisicaEntity).nome = dados.pessoaFisica.nome;
        (cliente as IPessoaFisicaEntity).cpf = dados.pessoaFisica.cpf;
    } else if(dados.pessoaJuridica) {
        (cliente as IPessoaJuridicaEntity).razao_social = dados.pessoaJuridica.razaoSocial;
        (cliente as IPessoaJuridicaEntity).cnpj = dados.pessoaJuridica.cnpj;
    } else {
        return;
    }

    return (cliente as ClientEntity)
}