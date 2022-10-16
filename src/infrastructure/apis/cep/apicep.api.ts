import { IAddressEntity } from "../../../domain/entities/clients/address.entity";
import { Cep } from "../../../adapters/connectors/cep.interfaces";
import fetch from 'cross-fetch';

export class ApiCep implements Cep {
    public async buscaEndereco(cep: string): Promise<IAddressEntity | undefined> {
        try {

            const cepResponse = await fetch(`https://cdn.apicep.com/file/apicep/${cep.slice(0, 5)}-${cep.slice(5, 8)}.json`)

            if (cepResponse.status != 200) {
                return;
            }

            const cepInfo: any = await cepResponse.json();

            return {
                cep: cepInfo.code,
                logradouro: cepInfo.addrress,
                bairro: cepInfo.district,
                cidade: cepInfo.city,
                estado: cepInfo.state
            }
        } catch (error) {
            return
        }
    }
}