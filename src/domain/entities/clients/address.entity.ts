//Aqruivo que vai definir a regra de configuração dos endereços, o que será informado como resposta

export interface IAddressEntity {
    cep: string,
    logradouro?: string,
    complemento?: string,
    bairro: string,
    cidade: string,
    estado: string
}