//Exportando a entidade client para garantir o retorno do tipo
import { ClientEntity } from "../entities/clients/client.entity"

//Aqui vai ficar o que tem que ser criado e como vai funcionar mas de uma forma como niterface
export interface IClientsRepository {
    listID(resourceId: number): Promise<ClientEntity | undefined>,
    create(resource: ClientEntity): Promise<ClientEntity>,
    delete(resourceId: number): Promise<void>,
    list(): Promise<ClientEntity[]>,
    update(resource: ClientEntity): Promise<ClientEntity | undefined>
}

//O any é bom pois eu não sei o que vou receber, então o any facilitaria, pois é uma validação de estrutura
//Promise: é o mesmo async await que pode retornar também qualquer cooisa, baseado na mesma informação passad

