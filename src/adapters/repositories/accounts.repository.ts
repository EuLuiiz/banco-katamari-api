import * as  Sequelize from "sequelize";
import { AccountEntity } from "../../domain/entities/accounts/account.entity";
import { IAccountsRepository } from "../../domain/repositories/accounts.repository.interface";
import { IDatabaseModel } from "../../infrastructure/persistence/databasemodel.interface";
import entitiesToModelsAccounts from "../../infrastructure/persistence/mysql/helpers/accounts/entitiesToModels.accounts.mysql.database";
import modelsToEntitiesAccounts from "../../infrastructure/persistence/mysql/helpers/accounts/modelsToEntities.accounts.mysql.database";
import contasModel from "../../infrastructure/persistence/mysql/model/contas.model.mysql.database";
import contascorrenteModel from "../../infrastructure/persistence/mysql/model/contascorrente.model.mysql.database";
import contaspoupancaModel from "../../infrastructure/persistence/mysql/model/contaspoupanca.model.mysql.database";
import pessoasModel from "../../infrastructure/persistence/mysql/model/pessoas.model.mysql.database";
import { MySqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";

export class AccountRepository implements IAccountsRepository {
    constructor(
        private _database: IDatabaseModel,
        private _modelPessoas: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelContas: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelContasCorrente: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelContasPoupanca: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
    ) {
        this._modelPessoas.hasOne(this._modelContas, {
            foreignKey: 'id_da_pessoa',
            as: 'contaPessoa'
        });

        this._modelContas.hasOne(this._modelContasCorrente, {
            foreignKey: 'id_da_conta',
            as: 'contaCorrente'
        });

        this._modelContas.hasOne(this._modelContasPoupanca, {
            foreignKey: 'id_da_conta',
            as: 'contaPoupanca'
        })
    }

    async create(dados: AccountEntity): Promise<AccountEntity> {
        try {
            const { conta, contaCorrente, contaPoupanca } = entitiesToModelsAccounts(dados) //entidadesParaModel
            const contaModel = await this._database.create(this._modelContas, conta);
            if (contaCorrente) {
                contaCorrente.id_da_conta = contaModel.null
                const contaCorrenteModel = this._database.create(this._modelContasCorrente, contaCorrente)
            }
            if (contaPoupanca) {
                contaPoupanca.id_da_conta = contaModel.null
                const contaPoupancaModel = this._database.create(this._modelContasPoupanca, contaPoupanca)
            }
            return dados;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    async list(): Promise<AccountEntity[]> {
        try {
            const listaContas = await this._database.list(this._modelContas, {
                includes: [
                    'contaCorrente',
                    'contaPoupanca'
                ]
            });
            const accounts = listaContas.map(modelsToEntitiesAccounts);

            return accounts;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    async listID(id: number): Promise<AccountEntity | undefined> {
        try {
            const conta = await this._database.listID(this._modelContas, id, {
                include: [
                    'contaCorrente',
                    'contaPoupanca'
                ]
            })
            return modelsToEntitiesAccounts(conta);
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    async update(dados: AccountEntity): Promise<AccountEntity | undefined> {
        try {
            let contaModel = await this._database.listID(this._modelContas, dados.conta_id!, {
                includes: [
                    'contaCorrente',
                    'contaPoupanca'
                ]
            });
            const { conta, contaCorrente, contaPoupanca } = entitiesToModelsAccounts(contaModel)
            await this._database.update(contaModel, conta);
            if (contaCorrente) {
                await this._database.update(await contaModel.getContaCorrente(), contaCorrente)
            }
            if (contaPoupanca) {
                await this._database.update(await contaModel.getContaPoupanca(), contaPoupanca)
            }

            return dados;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this._database.delete(this._modelContasPoupanca, { id_da_conta: id });
            await this._database.delete(this._modelContasCorrente, { id_da_conta: id });
            await this._database.delete(this._modelContas, { id_da_conta: id });
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}

export default new AccountRepository(
    MySqlDatabase.getInstance(),
    pessoasModel,
    contasModel,
    contascorrenteModel,
    contaspoupancaModel
)