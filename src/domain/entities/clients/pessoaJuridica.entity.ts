import { IPessoaEntity } from "./pessoa.entity";

export interface IPessoaJuridicaEntity extends IPessoaEntity {
    razao_social: string,
    cnpj: number
}