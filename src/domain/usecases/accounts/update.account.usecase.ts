import accountsRepository from "../../../adapters/repositories/accounts.repository";
import { AccountEntity } from "../../entities/accounts/account.entity";
import { IAccountsRepository } from "../../repositories/accounts.repository.interface";
import { IUseCase } from "../usecase.interface";

class UpdateAccountUseCase implements IUseCase {
    constructor(private _repository: IAccountsRepository) {

    }
    async execute(data: any): Promise<AccountEntity | undefined> {
        return await this._repository.update(data)
    }
}

export default new UpdateAccountUseCase(
    accountsRepository
)