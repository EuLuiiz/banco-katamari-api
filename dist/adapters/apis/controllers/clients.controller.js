"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_client_usecase_1 = __importDefault(require("../../../domain/usecases/clients/create.client.usecase"));
const list_client_usecase_1 = __importDefault(require("../../../domain/usecases/clients/list.client.usecase"));
const listID_client_usecase_1 = __importDefault(require("../../../domain/usecases/clients/listID.client.usecase"));
const update_client_usecase_1 = __importDefault(require("../../../domain/usecases/clients/update.client.usecase"));
const delete_client_usecase_1 = __importDefault(require("../../../domain/usecases/clients/delete.client.usecase"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:clients-controller');
class ClientsController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const dados = yield create_client_usecase_1.default.execute(request.body);
            response.status(201).send(dados);
        });
    }
    list(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const dados = yield list_client_usecase_1.default.execute();
            response.status(200).send(dados);
        });
    }
    listID(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const dados = yield listID_client_usecase_1.default.execute({
                id: Number(request.params.clientID)
            });
            response.status(200).send(dados);
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const dado = request.body;
            dado.pessoa_id = request.params.clientID;
            const dados = yield update_client_usecase_1.default.execute(dado);
            response.status(200).send(dados);
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const dados = yield delete_client_usecase_1.default.execute({
                id: Number(request.params.clientID)
            });
            response.status(204).send();
        });
    }
    //Controller do upload de arquivos
    createClientBulk(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            //Contador para retornar a quantidade de usuários que foi mapeada
            let countUsers = 0;
            console.log('Controller');
            console.log(request.body.fileData);
            for (countUsers = 0; countUsers < request.body.fileData.length; countUsers++) {
                yield create_client_usecase_1.default.execute(request.body.fileData[countUsers]);
            }
            return response.status(201).send({
                create: countUsers
            });
        });
    }
}
exports.default = new ClientsController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50cy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FkYXB0ZXJzL2FwaXMvY29udHJvbGxlcnMvY2xpZW50cy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbUhBQXlGO0FBQ3pGLCtHQUFxRjtBQUNyRixtSEFBeUY7QUFDekYsbUhBQXlGO0FBQ3pGLG1IQUF5RjtBQUN6RixrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHdCQUF3QixDQUFDLENBQUM7QUFFN0QsTUFBTSxpQkFBaUI7SUFFYixNQUFNLENBQUMsT0FBd0IsRUFBRSxRQUEwQjs7WUFDN0QsTUFBTSxLQUFLLEdBQUcsTUFBTSwrQkFBbUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlELFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUM7S0FBQTtJQUVLLElBQUksQ0FBQyxPQUF3QixFQUFFLFFBQTBCOztZQUMzRCxNQUFNLEtBQUssR0FBRyxNQUFNLDZCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hELFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BDLENBQUM7S0FBQTtJQUVLLE1BQU0sQ0FBQyxPQUF3QixFQUFFLFFBQTBCOztZQUM3RCxNQUFNLEtBQUssR0FBRyxNQUFNLCtCQUFtQixDQUFDLE9BQU8sQ0FBQztnQkFDNUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUN0QyxDQUFDLENBQUM7WUFDSCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFFSyxNQUFNLENBQUMsT0FBd0IsRUFBRSxRQUEwQjs7WUFDN0QsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3pDLE1BQU0sS0FBSyxHQUFHLE1BQU0sK0JBQW1CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RELFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUM7S0FBQTtJQUVLLE1BQU0sQ0FBQyxPQUF3QixFQUFFLFFBQTBCOztZQUM3RCxNQUFNLEtBQUssR0FBRyxNQUFNLCtCQUFtQixDQUFDLE9BQU8sQ0FBQztnQkFDNUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUN0QyxDQUFDLENBQUM7WUFDSCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hDLENBQUM7S0FBQTtJQUVELGtDQUFrQztJQUM1QixnQkFBZ0IsQ0FBQyxPQUF3QixFQUFFLFFBQTBCOztZQUN2RSxpRUFBaUU7WUFDakUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ2xDLEtBQUssVUFBVSxHQUFHLENBQUMsRUFBRSxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFO2dCQUMxRSxNQUFNLCtCQUFtQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ3hFO1lBQ0QsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDN0IsTUFBTSxFQUFFLFVBQVU7YUFDckIsQ0FBQyxDQUFBO1FBQ04sQ0FBQztLQUFBO0NBQ0o7QUFFRCxrQkFBZSxJQUFJLGlCQUFpQixFQUFFLENBQUMifQ==