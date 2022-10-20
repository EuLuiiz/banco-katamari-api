import { IContaCorrenteEntity } from "./corrente.entity";
import { IContaPoupancaEntity } from "./poupanca.entity";

export type AccountEntity = IContaCorrenteEntity | IContaPoupancaEntity;