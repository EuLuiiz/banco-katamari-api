//O arquivo  foi copiado, modificações manuais e explicação se encontra no arquivo sobre MySQL
//Toda a declaração dos méteodos, como o Service, vai definir como vai armazenar nesse banco de dados, seguinto a lógica especificada na Interface
import { IDatabase } from "../database.interface";

export class ArrayDatabase implements IDatabase {
    private static _instance: ArrayDatabase;
    //Meu banco de dados
    private _data: any;

    private constructor(){
        //Criando o banco de dados vazio antes de armazenar as informações
        this._data = {};
    }

    //DP - Singleton, Fazendo ter apenas uma conexão com o banco
    public static getInstance(): ArrayDatabase {
        if (!ArrayDatabase._instance) {
            ArrayDatabase._instance = new ArrayDatabase();
        }

        return ArrayDatabase._instance;
    }

    create(type: string, data: any): number {
        let obj: any;
        
        if(this._data[type] === undefined){
            this._data[type] = [];
        }

        data.indexId = this._data[type] ? this._data[type].length : 0;
        obj = data;
        this._data[type].push(obj);

        return obj.indexId;
    }

    update(type: string, data: any): boolean {
        let obj: any;
        
        obj = data;

        if(obj.indexId === undefined)
            return false;
        
        this._data[type][obj.indexId] = obj;

        return obj;
    }

    list(type: string): any[] {
        let objs: any[] = [];

        if(this._data[type] === undefined){
            return [];
        }

        for(let data of this._data[type])
            objs.push(data);

        return objs;
    }

    delete(type: string, dataId: number): boolean {

        if(this._data[type] === undefined){
            return false;
        }

        const indexId = this._data.findIndex((obj: any) => {
                return obj.indexId === dataId;
        });
        

        if(indexId === undefined)
            return false;

        this._data[type].splice(indexId, 1);

        return true;
    }

    listID(type: string, dataId: number): any {

        if(this._data[type] === undefined){
            return undefined;
        }

        const data = this._data[type].find((obj: any) => {
                return obj.indexId === dataId;
        });

        if(!data)
            return false;

        return data;
    }
}