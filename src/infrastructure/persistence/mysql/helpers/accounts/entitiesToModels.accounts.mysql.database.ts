import { AccountEntity } from "../../../../../domain/entities/accounts/account.entity";

export default function (dados: AccountEntity) {
    const conta = {
        conta_id: dados.conta_id,
        saldo: dados.saldo,
        numero_da_conta: dados.numero_da_conta
    }

    let contaCorrente = undefined;
    let contaPoupanca = undefined;

    if ('limite' in dados) {
        contaCorrente = {
            id_da_conta: undefined,
            limite: dados.limite,
            numero_da_conta: dados.numero_da_conta
        }
    }
    if ('rendimento' in dados) {
        contaPoupanca = {
            id_da_conta: undefined,
            rendimento: dados.rendimento,
            numero_da_conta: dados.numero_da_conta
        }
    }

    return {
        conta: conta,
        contaCorrente: contaCorrente,
        contaPoupanca: contaPoupanca
    }
}