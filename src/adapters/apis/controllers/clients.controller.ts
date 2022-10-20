import express from 'express';
import createClientUsecase from '../../../domain/usecases/clients/create.client.usecase';
import listClientUsecase from '../../../domain/usecases/clients/list.client.usecase';
import listIDClientUsecase from '../../../domain/usecases/clients/listID.client.usecase';
import updateClientUsecase from '../../../domain/usecases/clients/update.client.usecase';
import deleteClientUsecase from '../../../domain/usecases/clients/delete.client.usecase';
import debug from 'debug';

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

    async listID(request: express.Request, response: express.Response) {
        const dados = await listIDClientUsecase.execute({
            id: Number(request.params.clientID)
        });
        response.status(200).send(dados);
    }

    async update(request: express.Request, response: express.Response) {
        const dado = request.body;
        dado.pessoa_id = request.params.clientID;
        const dados = await updateClientUsecase.execute(dado);
        response.status(200).send(dados);
    }

    async delete(request: express.Request, response: express.Response) {
        const dados = await deleteClientUsecase.execute({
            id: Number(request.params.clientID)
        });
        response.status(204).send();
    }

    //Controller do upload de arquivos
    async createClientBulk(request: express.Request, response: express.Response) {
        //Contador para retornar a quantidade de usuários que foi mapeada
        let countUsers = 0;
        for (countUsers = 0; countUsers < request.body.fileData.length; countUsers++) {
            await createClientUsecase.execute(request.body.fileData[countUsers]);
        }
        return response.status(201).send({
            create: countUsers
        })
    }
}

export default new ClientsController();