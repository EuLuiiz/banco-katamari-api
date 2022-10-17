//Informando o modelo do banco de dados
import { IDatabaseModel } from "../../infrastructure/persistence/databasemodel.interface";
//Para definir o tipo de objeto que será enviado aos métodos
import { ClientEntity } from "../../domain/entities/clients/client.entity";
//Para poder validar ser os métodos estão corretos
import { IClientsRepository } from "../../domain/repositories/clients.repository.interface";
//Importando o banco de dados para quando for dado o New, ser iniciado e todos os seus métodos da interface Model funcionar devidamente
import { MySqlDatabase } from '../../infrastructure/persistence/mysql/mysql.database';
//Sequelize para definir os tipos
import * as Sequelize from 'sequelize';
//Model das tabelas
import pessoasModel from "../../infrastructure/persistence/mysql/model/pessoas.model.mysql.database";
import enderecosModel from "../../infrastructure/persistence/mysql/model/enderecos.model.mysql.database";
import pessoasfisicasModel from "../../infrastructure/persistence/mysql/model/pessoasfisicas.model.mysql.database";
import pessoasjuridicasModel from "../../infrastructure/persistence/mysql/model/pessoasjuridicas.model.mysql.database";
//Os arquivos que vão tratar os dados da requisição ou da resposta
import entitiesToModels from "../../infrastructure/persistence/mysql/helpers/entitiesToModels.mysql.database";
import modelsToEntities from "../../infrastructure/persistence/mysql/helpers/modelsToEntities.mysql.database";

export class ClientsRepository implements IClientsRepository {
    //O constructor agora recebe os parametros os model que ela vai usar
    constructor(
        private _database: IDatabaseModel,
        private _modelPessoas: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelPessoasFisicas: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelPessoasJuridicas: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelEnderecos: Sequelize.ModelCtor<Sequelize.Model<any, any>>
    ) {
        //Informando suas relações (1 to N)
        this._modelPessoas.hasOne(this._modelPessoasFisicas, {
            foreignKey: 'pessoa_id',
            as: 'pessoaFisica'
        });

        this._modelPessoas.hasOne(this._modelPessoasJuridicas, {
            foreignKey: 'pessoa_id',
            as: 'pessoaJuridica'
        });

        this._modelPessoas.hasOne(this._modelEnderecos, {
            foreignKey: 'pessoa_id',
            as: 'endereco'
        });
    }

    //Métodos
    async create(dados: ClientEntity): Promise<ClientEntity> {
        //As informações da requisição será convertida para o formado do banco e separado
        //Como no banco de dados são 4 tabelas de dados, separamos todo o objeto da requisição de forma com que esteja no mesmo modelo das tabelas
        const { pessoa, pessoaFisica, pessoaJuridica, endereco } = entitiesToModels(dados);
        //Chamando o método configurado na database informando também a pessoa separada
        const pessoaModel = await this._database.create(this._modelPessoas, pessoa);
        //Se for uma pessoa fisica, vai chamar o método para criar na tabela a pessoa fisica
        if (pessoaFisica) {
            const pessoaFisicaModel = await this._database.create(this._modelPessoasFisicas, pessoaFisica);
        }
        //O mesmo com a pessoa juridica
        if (pessoaJuridica) {
            const pessoaJuridicaModel = await this._database.create(this._modelPessoasJuridicas, pessoaJuridica);
        }
        //O mesmo para endereço
        if (endereco) {
            const enderecoModel = await this._database.create(this._modelEnderecos, endereco);
        }
        //Retornando os dados que foi criado
        return dados;
    }

    async list(): Promise<ClientEntity[]> {
        const listaClientes = await this._database.list(this._modelPessoas, {
            include: [
                'pessoaFisica',
                'pessoaJuridica',
                'endereco'
            ]
        });
        //percorrer por todos os clientes encontrados (acima) e convertidos com a função
        const clients = listaClientes.map(modelsToEntities);
        //Retornando a lista convertida com todos os includes e tratamentos
        return clients;
    }

    async listID(resourceId: number): Promise<ClientEntity | undefined> {
        try {
            //No database, vai usar o método de listar por ID, ultilizando o model de pessoas e mandando o ID como parametro, pedindo para incluir junto as outras informações da tabela caso tiver
            const cliente = await this._database.listID(this._modelPessoas, resourceId, {
                include: [
                    'pessoaFisica',
                    'pessoaJuridica',
                    'endereco'
                ]
            });
            //Vai pegar os dados que foi pego no banco de dados e 'converter' de uma forma que seja entendivel pela aplicação
            return modelsToEntities(cliente);
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    async update(dados: ClientEntity): Promise<ClientEntity | undefined> {
        //O update é uma mistura de create com listID
        //Com o listID vai armazenar toda a informação encontrada
        //Depois vai converter os dados e ir atualializando tabela por tabela
        let pessoaModel = await this._database.listID(this._modelPessoas, dados.pessoa_id!, {
            include: [
                'pessoaFisica',
                'pessoaJuridica',
                'endereco'
            ]
        });
        const { pessoa, pessoaFisica, pessoaJuridica, endereco } = entitiesToModels(dados);
        await this._database.update(pessoaModel, pessoa);
        if (pessoaFisica) {
            await this._database.update(await pessoaModel.getPessoaFisica(), pessoaFisica);
        }
        if (pessoaJuridica) {
            await this._database.update(await pessoaModel.getPessoaJuridica(), pessoaJuridica);
        }
        if (endereco) {
            await this._database.update(await pessoaModel.getEnderecos(), endereco);
        }
        //Retorna os dados atualizados
        return dados;
    }

    async delete(id: number): Promise<void> {
        await this._database.delete(this._modelPessoasFisicas, { pessoa_id: id });
        await this._database.delete(this._modelPessoasJuridicas, { pessoa_id: id });
        await this._database.delete(this._modelEnderecos, { pessoa_id: id });
        await this._database.delete(this._modelPessoas, { pessoa_id: id });
    }
}

export default new ClientsRepository(
    MySqlDatabase.getInstance(),
    pessoasModel,
    pessoasfisicasModel,
    pessoasjuridicasModel,
    enderecosModel
);

/**
 * Explicando os exports do Model em geral:
    No constructor foi criado variaveis privadas para [Explicação]
    Assim, para poder de fato usar os tais model, cria-se junto com a exportação, os model importado
 */