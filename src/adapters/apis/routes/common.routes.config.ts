//Arquivo base onde ficará todas as rotas básicas e comuns da API

//Importando a biblioteca express
import express from "express";

//Classe abstrata pois nunca vou ter uma rota Common, mas quero ter um padrão de rotas para usar com todos os elementos
export abstract class CommonRoutesConfig {
    constructor(public app: express.Application, public name: string) {
        this.configureRoutes();
    }

    //Função que vai retornar o nome da rota
    getName() {
        return this.name;
    }

    //Por ser abstrata ela não precisa ser implementada, mas as outras que vão herdar terá que implementar
    abstract configureRoutes(): express.Application;
}