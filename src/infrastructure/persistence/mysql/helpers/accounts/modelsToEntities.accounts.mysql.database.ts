import { AccountEntity } from "../../../../../domain/entities/accounts/account.entity"
import { IBaseAccountEntity } from "../../../../../domain/entities/accounts/base.entity"
import { IContaCorrenteEntity } from "../../../../../domain/entities/accounts/corrente.entity"
import { IContaPoupancaEntity } from "../../../../../domain/entities/accounts/poupanca.entity"

export default function (dados: any): AccountEntity | undefined {
    if (!dados) {
        return
    }

    let conta: IBaseAccountEntity = {
        conta_id: dados.conta_id,
        numero_da_conta: dados.numero_da_conta
    }

    if (dados.contaCorrente) {
        (conta as IContaCorrenteEntity).limite = dados.limite;
        (conta as IContaCorrenteEntity).numero_da_conta = dados.numero_da_conta;
    } else if (dados.contaPoupanca) {
        (conta as IContaPoupancaEntity).rendimento = dados.rendimento;
        (conta as IContaPoupancaEntity).numero_da_conta = dados.numero_da_conta;
    } else {
        return;
    }


}