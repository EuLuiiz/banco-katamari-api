import express from 'express';
import createClientUsecase from '../../../domain/usecases/clients/create.client.usecase';
//import readClientUsecase from '../../../domain/usecases/clients/read.client.usecase';
//import updateClientUsecase from '../../../domain/usecases/clients/update.client.usecase';
//import deleteClientUsecase from '../../../domain/usecases/clients/delete.client.usecase';
//import listClientUsecase from '../../../domain/usecases/clients/list.client.usecase';
import listClientUsecase from '../../../domain/usecases/clients/list.client.usecase';
import debug from 'debug';
import listIDClientUsecase from '../../../domain/usecases/clients/listID.client.usecase';
import updateClientUsecase from '../../../domain/usecases/clients/update.client.usecase';
import deleteClientUsecase from '../../../domain/usecases/clients/delete.client.usecase';

const log: debug.IDebugger = debug('app:clients-controller');

class ClientsController {

    async create(request: express.Request, response: express.Response) {
        const dados = await createClientUsecase.execute(request.body);
        response.status(201).send(dados);
    }

    async list(request: express.Request, response: express.Response) {
        const dados = await listClientUsecase.execute();
        response.status(200).send(dados)
    }

    async listID(request: express.Request, response: express.Response){
        const dados = await listIDClientUsecase.execute(Number(request.params.clientID));
        response.status(200).send(dados);
    }

    async update(request: express.Request, response: express.Response){
        const dados = await updateClientUsecase.execute(request.body);
        response.status(200).send(dados);
    }

    async delete(request: express.Request, response: express.Response){
        const dados = await deleteClientUsecase.execute(Number(request.params.clientID));
        response.status(204).send();
    }
}

export default new ClientsController();