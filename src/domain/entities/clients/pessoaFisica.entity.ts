//Pegando a interface para extender a nova criada
import { IPessoaEntity } from './pessoa.entity';

//A interface pessoa fisica terá tambéms os atributos da pessoa normal, além das novas informaçõesw
export interface IPessoaFisicaEntity extends IPessoaEntity {
    nome: string,
    cpf: number
}