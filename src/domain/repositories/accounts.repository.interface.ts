import { AccountEntity } from "../entities/accounts/account.entity";

export interface IAccountsRepository {
    create(data: AccountEntity): Promise<AccountEntity>,
    list(): Promise<AccountEntity[]>,
    listID(dataID: number): Promise<AccountEntity | undefined>,
    update(data: AccountEntity): Promise<AccountEntity | undefined>
    delete(dataID: number): Promise<void>
}