import accountsRepository from "../../../adapters/repositories/accounts.repository";
import { AccountEntity } from "../../entities/accounts/account.entity";
import { IAccountsRepository } from "../../repositories/accounts.repository.interface";
import { IUseCase } from "../usecase.interface";

class ListAccountUseCase implements IUseCase {
    constructor(private _repository: IAccountsRepository) {

    }

    async execute(): Promise<AccountEntity[] | undefined> {
        return await this._repository.list()
    }
}

export default new ListAccountUseCase(
    accountsRepository
)