//Arquivo para exportar o modelo da estrutuda da oessoa básicaF

//Informando que o endereço vai receber as mesmas propriedades definidas no DTO de endereço
import { IAddressEntity } from './address.entity'


export interface IPessoaEntity {
    pessoa_id?: number,
    endereco?: IAddressEntity,
    cep:string,
    limite_credito: number,
    dataCadastro?: Date,
    dataAtualizacao?: Date,
    observacao: string
}