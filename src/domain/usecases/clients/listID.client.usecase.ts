import clientsRepository from "../../../adapters/repositories/clients.repository";
import { ClientEntity } from "../../entities/clients/client.entity";
import { IClientsRepository } from "../../repositories/clients.repository.interface";
import { IUseCase } from "../usecase.interface";

class listIDClientUseCase implements IUseCase {
    constructor(private _repository: IClientsRepository) {

    }

    //Caso o list não funcionar dessa maneira, troque o ID por: data: { clientId: number }, alterando os parenteses por: data.clientId
    async execute(id: number): Promise<ClientEntity | undefined> {
        return await this._repository.readById(id);
    }
}

export default new listIDClientUseCase(clientsRepository);