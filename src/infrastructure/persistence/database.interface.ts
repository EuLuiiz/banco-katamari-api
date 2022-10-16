//Definindo o que TODO banco de dados vai ter como base, declarando a regra de funcionamento a partir da interface
//O formato é genérico para poder ser atribuido a qualquer tipo de armazenamento
export interface IDatabase {
    list(type: any): any[],
    create(type: any, data: any): any,
    read(type: any, dataId: number): any,
    update(type: any, data: any): any,
    delete(type: any, dataId: any): any
}