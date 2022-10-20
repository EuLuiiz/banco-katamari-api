import accountsRepository from "../../../adapters/repositories/accounts.repository";
import { AccountEntity } from "../../entities/accounts/account.entity";
import { IAccountsRepository } from "../../repositories/accounts.repository.interface";
import { IUseCase } from "../usecase.interface";

class ListIDAccountUseCase implements IUseCase {
    constructor(private _repository: IAccountsRepository) {

    }
    async execute(data: { id: number }): Promise<AccountEntity | undefined> {
        return await this._repository.listID(data.id)
    }
}

export default new ListIDAccountUseCase(
    accountsRepository
)