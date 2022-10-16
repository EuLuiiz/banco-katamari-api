import clientsRepository from "../../../adapters/repositories/clients.repository";
import { ClientEntity } from "../../entities/clients/client.entity";
import { IClientsRepository } from "../../repositories/clients.repository.interface";
import { IUseCase } from "../usecase.interface";

class updateClientUseCase implements IUseCase{
    constructor(private _repository:IClientsRepository){

    }
    async execute(dados:ClientEntity):Promise<ClientEntity|undefined> {
        return await this._repository.updateById(dados)
    }
}

export default new updateClientUseCase(clientsRepository);