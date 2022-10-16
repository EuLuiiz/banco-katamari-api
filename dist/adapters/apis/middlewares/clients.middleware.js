"use strict";
//Arquivo para fazer testes antes de usar o controller, evitando erros, ou garantindo dados corretos
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
//read do usecases clients, trocar os clientsServices por usecases.read
const debug_1 = __importDefault(require("debug"));
const listID_client_usecase_1 = __importDefault(require("../../../domain/usecases/clients/listID.client.usecase"));
const log = (0, debug_1.default)('app:clients-middleware');
class ClientsMiddleware {
    //Coloco validações que eu acho interessante ter
    //Validar dados do Body
    validateRequiredClientBodyFields(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //Verificar se existe as informações dadas
            if (request.body && (request.body.cpf || request.body.cnpf)) {
                next();
            }
            else {
                response.status(400).send({ error: `Você deve enviar o campo CPF ou CNPJ.` });
            }
        });
    }
    validateClientExist(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield listID_client_usecase_1.default.execute(Number(request.params.idClient));
            if (user) {
                next();
            }
            else {
                response.status(404).send({ error: `CPF/CNPJ: ${request.params.idClient} não encontrado, tente novamente.` });
            }
        });
    }
    validateClientRepeated(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //Foi usado um if mais simples
            let resourceID = ('cpf' in request.body ? request.body.cpf : request.body.cnpj);
            const user = yield listID_client_usecase_1.default.execute(resourceID);
            if (!user) {
                next();
            }
            else {
                response.status(404).send({ error: `CPF/CNPJ: ${resourceID} já existe, faça o login ou acione o suporte` });
            }
        });
    }
}
exports.default = new ClientsMiddleware();
//Os bloqueios entre middleware e DAOS servem do mesmo, porem no DAOS é obrigatória, no Middleware é para questão de performace
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50cy5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FkYXB0ZXJzL2FwaXMvbWlkZGxld2FyZXMvY2xpZW50cy5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvR0FBb0c7Ozs7Ozs7Ozs7Ozs7O0FBR3BHLHVFQUF1RTtBQUN2RSxrREFBMEI7QUFDMUIsbUhBQXlGO0FBRXpGLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyx3QkFBd0IsQ0FBQyxDQUFBO0FBRTVELE1BQU0saUJBQWlCO0lBQ25CLGdEQUFnRDtJQUNoRCx1QkFBdUI7SUFDakIsZ0NBQWdDLENBQUMsT0FBd0IsRUFBRSxRQUEwQixFQUFFLElBQTBCOztZQUNuSCwwQ0FBMEM7WUFDMUMsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekQsSUFBSSxFQUFFLENBQUM7YUFDVjtpQkFBTTtnQkFDSCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSx1Q0FBdUMsRUFBRSxDQUFDLENBQUM7YUFDakY7UUFDTCxDQUFDO0tBQUE7SUFDSyxtQkFBbUIsQ0FBQyxPQUF3QixFQUFFLFFBQTBCLEVBQUUsSUFBMEI7O1lBQ3RHLE1BQU0sSUFBSSxHQUFHLE1BQU0sK0JBQW1CLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEYsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLENBQUE7YUFDVDtpQkFBTTtnQkFDSCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxhQUFhLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxtQ0FBbUMsRUFBRSxDQUFDLENBQUE7YUFDaEg7UUFDTCxDQUFDO0tBQUE7SUFDSyxzQkFBc0IsQ0FBQyxPQUF3QixFQUFFLFFBQTBCLEVBQUUsSUFBMEI7O1lBRXpHLDhCQUE4QjtZQUM5QixJQUFJLFVBQVUsR0FBVyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN2RixNQUFNLElBQUksR0FBRyxNQUFNLCtCQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLElBQUksRUFBRSxDQUFBO2FBQ1Q7aUJBQU07Z0JBQ0gsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsYUFBYSxVQUFVLDhDQUE4QyxFQUFFLENBQUMsQ0FBQzthQUMvRztRQUNMLENBQUM7S0FBQTtDQUNKO0FBRUQsa0JBQWUsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0FBRXZDLCtIQUErSCJ9