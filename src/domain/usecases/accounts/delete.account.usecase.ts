import accountsRepository from "../../../adapters/repositories/accounts.repository";
import { IAccountsRepository } from "../../repositories/accounts.repository.interface";
import { IUseCase } from "../usecase.interface";

class DeleteAccountUseCase implements IUseCase {
    constructor(private _repository: IAccountsRepository) {

    }
    async execute(data: { id: number }):Promise<void> {
        return await this._repository.delete(data.id)
    }
}

export default new DeleteAccountUseCase(
    accountsRepository
)