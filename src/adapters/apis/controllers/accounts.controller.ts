import express from 'express';
import debug from 'debug';
import createAccountUsecase from '../../../domain/usecases/accounts/create.account.usecase';
import listAccountUsecase from '../../../domain/usecases/accounts/list.account.usecase';
import listIDAccountUsecase from '../../../domain/usecases/accounts/listID.account.usecase';
import updateAccountUsecase from '../../../domain/usecases/accounts/update.account.usecase';
import deleteAccountUsecase from '../../../domain/usecases/accounts/delete.account.usecase';

const log: debug.IDebugger = debug('app:accounts-controller');

class AccountsController {
    async create(request: express.Request, response: express.Response) {
        const dados = await createAccountUsecase.execute(request.body);
        response.status(201).send(dados);
    }
    async list(request: express.Request, response: express.Response) {
        const dados = await listAccountUsecase.execute();
        response.status(200).send(dados)
    }
    async listID(request: express.Request, response: express.Response) {
        const dado = await listIDAccountUsecase.execute({
            id: Number(request.params.accountID)
        });
        response.status(200).send(dado)
    }
    async update(request: express.Request, response: express.Response) {
        const dado = request.body;
        dado.conta_id = request.params.accountID;
        const dados = await updateAccountUsecase.execute(dado);
        response.status(200).send(dados);
    }
    async delete(request: express.Request, response: express.Response) {
        const dados = await deleteAccountUsecase.execute({
            id: Number(request.params.accountID)
        })
        response.status(204).send()
    }
}

export default new AccountsController();