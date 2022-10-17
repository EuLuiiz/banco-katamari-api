//Importando sequelize
import * as Sequelize from 'sequelize';
//Importanto o Model para configurar as funções especificas do banco SQL
import { IDatabaseModel } from '../databasemodel.interface';
//Importando o arquivo de configuração para fazer a conexão
import databaseConfig from '../../config/database.config';

export class MySqlDatabase implements IDatabaseModel {
    private static _instance: MySqlDatabase;
    private _db: string;
    private _username: string;
    private _password: string;
    private _host: string;
    private _dialect: Sequelize.Dialect;
    private _port: number;
    private _adapter: Sequelize.Sequelize;

    constructor(){
        this._db = databaseConfig.db!;
        this._username = databaseConfig.username!;
        this._password = databaseConfig.password!;
        this._host = databaseConfig.host!;
        this._dialect = 'mysql';
        this._port = Number(databaseConfig.port);

        this._adapter = new Sequelize.Sequelize(this._db, this._username, this._password, {
            host: this._host,
            dialect: this._dialect,
            port: this._port
        });
    }
    //Singleton
    public static getInstance(): MySqlDatabase {
        if (!MySqlDatabase._instance) {
            MySqlDatabase._instance = new MySqlDatabase();
        }

        return MySqlDatabase._instance;
    }

    //Métodos
    /**
     * 
     * @param model: Vai receber o nome do método que o repositório vai usar
     * @param data: Vai receber a informação que o sequelize vai 'tratar' com o banco
     * 
     */

    create(model: Sequelize.ModelCtor<Sequelize.Model<any, any>>, data: any): any {
        return model.create(data);
    }

    async update(model: Sequelize.Model<any, any>, data: any): Promise<any> {
        await model.update(data);
        return model.save();
    }

    //Listar tudo junto com o que for incluido
    list(model: Sequelize.ModelCtor<Sequelize.Model<any, any>>, includes: object): any {
        return model.findAll(includes);
    }

    //Vai deletar o dataWhere(id) informado
    async delete(model: Sequelize.ModelCtor<Sequelize.Model<any, any>>, dataWhere: Sequelize.WhereOptions<any>): Promise<any> {
        const result = await model.destroy({
            where: dataWhere
        });

        return (result > 0);
    }

    //Vai listar usando o ID e incluindo o que for configurado para incluir
    listID(model: Sequelize.ModelCtor<Sequelize.Model<any, any>>, dataId: number, includes: object): any {
        try{
            return model.findByPk(dataId, includes);
        } catch(err){
            throw new Error((err as Error).message);
        }
    }

    //método para criar os model do banco de dados, recebendo os parametros para ser criado
    createModel(name: string, properties: Sequelize.ModelAttributes): Sequelize.ModelCtor<Sequelize.Model<any, any>> {
        return this._adapter.define(
            name,
            properties,
            {
                timestamps: false
            }
        )
    }
}