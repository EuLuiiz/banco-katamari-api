//Arquivo que faz a conexão com a API externa, e informando a forma como salva as informações baseadas nas Interfaces e DTO
//Arquivo que tem configurado o método para pegar o CEP

import { IAddressEntity } from "../../../domain/entities/clients/address.entity";
import { Cep } from "../../../adapters/connectors/cep.interfaces";
import fetch from 'cross-fetch';

export class ViaCep implements Cep {
    public async buscaEndereco(cep: string): Promise<IAddressEntity | undefined> {
        try {
            const cepResponse = await fetch(`viacep.com.br/ws/${cep}/json/`);

            if (cepResponse.status != 200) {
                return;
            }

            const cepInfo: any = await cepResponse.json();

            if ('erro' in cepInfo) {
                return;
            }

            return {
                cep: cepInfo.cep,
                logradouro: cepInfo.logradouro,
                complemento: cepInfo.complemento,
                bairro: cepInfo.bairro,
                cidade: cepInfo.localidade,
                estado: cepInfo.uf
            }

        } catch (error) {
            return;
        }
    }
}
