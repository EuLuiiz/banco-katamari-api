import clientsRepository from "../../../adapters/repositories/clients.repository";
import { IClientsRepository } from "../../repositories/clients.repository.interface";
import { IUseCase } from "../usecase.interface";

class deleteClientUseCase implements IUseCase {
    constructor(private _repository: IClientsRepository) {

    }

    async execute(id: number): Promise<void> {
        return await this._repository.deleteById(id)
    }
}

export default new deleteClientUseCase(clientsRepository);