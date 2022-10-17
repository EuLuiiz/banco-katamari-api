//Arquivo que vai tratar os dados enviados na requisição de uma forma onde seja salvo corretamente no banco de dados, é como se fosse um middleware

import { ClientEntity } from "../../../../domain/entities/clients/client.entity";

//O tratamento é feito a partir de uma função que vai receber os dados do cliente e 'converter' para os modelos do banco de dados
export default function (cliente: ClientEntity) {
    //Tabela [Pessoas]
    const pessoa = {
        pessoa_id: cliente.pessoa_id,
        cep: cliente.cep,
        limite_credito: cliente.limite_credito,
        observacao: cliente.observacao
    }

    //Tabela [Pessoas Fisica] [Pessoas Juridicas]
    //Iniciando undefined para caso não for, não enviar ao banco
    let pessoaFisica = undefined;
    let pessoaJuridica = undefined;
    let endereco = undefined;

    //Verificações, e caso TRUE, tratar os dados para o modelo do banco
    if ('cpf' in cliente) {
        pessoaFisica = {
            id_da_pessoa: undefined,
            nome: cliente.nome,
            cpf: cliente.cpf
        }
    }
    if ('cnpj' in cliente) {
        pessoaJuridica = {
            id_da_pessoa: undefined,
            razao_social: cliente.razao_social,
            cnpj: cliente.cnpj
        }
    }
    if ('endereco' in cliente) {
        //Os ... são os Rest Params, ele já faz a desestruturação do objeto (pega o cliente.endereco e já cria um objeto com a estrutura, depois faz a contenação)
        endereco = { ...cliente.endereco, ...{ id_da_pessoa: undefined } };
    }

    return {
        pessoa: pessoa,
        pessoaFisica: pessoaFisica,
        pessoaJuridica: pessoaJuridica,
        endereco: endereco
    }
}
