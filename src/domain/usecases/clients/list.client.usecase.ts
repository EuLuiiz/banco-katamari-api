import clientsRepository from "../../../adapters/repositories/clients.repository";
import { ClientEntity } from "../../entities/clients/client.entity";
import { IClientsRepository } from "../../repositories/clients.repository.interface";
import { IUseCase } from "../usecase.interface";

class listClientsUseCase implements IUseCase {
    constructor(private _repository: IClientsRepository) {

    }

    async execute(): Promise<ClientEntity[] | undefined> {
        return await this._repository.list()
    }
}

//Inicia-se colocando como parametro o ClientsRepository para que possa ser usado no constructor e ter o repositório
export default new listClientsUseCase(clientsRepository)