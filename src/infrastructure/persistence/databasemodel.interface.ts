//Incluindo a interface base para herdar todos os funcionamentos
import { IDatabase } from "./database.interface";

//criando os métodos particulares que um banco de dados vai usar, por exemplo poder incluir outras tabelas do banco
export interface IDatabaseModel extends IDatabase {
    //Explicação
    createModel(name: string, properties: any): any,
    //Método de leitura que com o banco de dados vai incluir as outras tabelas complementares
    //Explicação de type 
    listID(type: any, id: number, includes?: object): any
    //método de listagem padrão para já incluir todos as tabelas dependentes
    list(type: any, includes?: object): any;
}