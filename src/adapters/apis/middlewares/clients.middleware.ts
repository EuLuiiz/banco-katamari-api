//Arquivo para fazer testes antes de usar o controller, evitando erros, ou garantindo dados corretos

import express from 'express';
//read do usecases clients, trocar os clientsServices por usecases.read
import debug from 'debug';
import listIDClientUsecase from '../../../domain/usecases/clients/listID.client.usecase';

const log: debug.IDebugger = debug('app:clients-middleware')

class ClientsMiddleware {
    //Coloco validações que eu acho interessante ter
    //Validar dados do Body
    async validateRequiredClientBodyFields(request: express.Request, response: express.Response, next: express.NextFunction) {
        //Verificar se existe as informações dadas
        if (request.body && (request.body.cpf || request.body.cnpf)) {
            next();
        } else {
            response.status(400).send({ error: `Você deve enviar o campo CPF ou CNPJ.` });
        }
    }
    async validateClientExist(request: express.Request, response: express.Response, next: express.NextFunction) {
        const user = await listIDClientUsecase.execute(Number(request.params.idClient));
        if (user) {
            next()
        } else {
            response.status(404).send({ error: `CPF/CNPJ: ${request.params.idClient} não encontrado, tente novamente.` })
        }
    }
    async validateClientRepeated(request: express.Request, response: express.Response, next: express.NextFunction) {

        //Foi usado um if mais simples
        let resourceID: number = ('cpf' in request.body ? request.body.cpf : request.body.cnpj)
        const user = await listIDClientUsecase.execute(resourceID);
        if (!user) {
            next()
        } else {
            response.status(404).send({ error: `CPF/CNPJ: ${resourceID} já existe, faça o login ou acione o suporte` });
        }
    }
}

export default new ClientsMiddleware();

//Os bloqueios entre middleware e DAOS servem do mesmo, porem no DAOS é obrigatória, no Middleware é para questão de performace