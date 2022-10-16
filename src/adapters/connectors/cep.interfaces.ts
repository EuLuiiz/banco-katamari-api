//A interface vai definir a função de procurar um endereço e retornar um objeto baseado no DTO de endereço

import { IAddressEntity } from "../../domain/entities/clients/address.entity";

export interface Cep {
    buscaEndereco(cep: string): Promise<IAddressEntity | undefined>;
}