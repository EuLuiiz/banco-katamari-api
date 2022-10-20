import { ClientEntity } from "../../entities/clients/client.entity";
import { IClientsRepository } from "../../repositories/clients.repository.interface";
import ClientsRepository from "../../../adapters/repositories/clients.repository";
import { IUseCase } from "../usecase.interface";
import { ViaCepFactory } from "../../../infrastructure/apis/cep/viacepfactory.api";
import { ApiCepFactory } from "../../../infrastructure/apis/cep/apicepfactory.api";
import { CepFactory } from "../../../adapters/connectors/cepfactory.api";

export class CreateClientUseCase implements IUseCase {

    constructor(private _repository: IClientsRepository, private _viaCep: CepFactory, private _apiCep: CepFactory) {

    }

    async execute(data: ClientEntity): Promise<ClientEntity | undefined> {
        data.endereco = await this._viaCep.preencherEndereco(data.cep);

        if (!data.endereco) {
            data.endereco = await this._apiCep.preencherEndereco(data.cep);
        }
        if (!data.endereco) {
            data.endereco = {
                cep: "00000000",
                logradouro: undefined,
                complemento: undefined,
                bairro: 'Bairro Teste',
                cidade: 'Cidade Offline',
                estado: 'SEM-NET'
            }
        }
        return await this._repository.create(data);
    }
}

export default new CreateClientUseCase(
    ClientsRepository,
    new ViaCepFactory(),
    new ApiCepFactory()
);