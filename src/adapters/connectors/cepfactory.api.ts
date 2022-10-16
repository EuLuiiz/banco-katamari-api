//Definir a regra de negócio [Factory], assim independente da API que eu usar, eles vão seguir a mesma regra de negócio (de procurar o endereço a partir do CEP)

import { Cep } from "./cep.interfaces";
import { IAddressEntity } from "../../domain/entities/clients/address.entity";

export abstract class CepFactory {
    //A função factory vai retornar o modelo definido na interface CEP
    public abstract factoryMethod(): Cep;

    public preencherEndereco(cep: string): Promise<IAddressEntity | undefined> {
        const cepAdquirido = this.factoryMethod();

        return cepAdquirido.buscaEndereco(cep);
    }
}