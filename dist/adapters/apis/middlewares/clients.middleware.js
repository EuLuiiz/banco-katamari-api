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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const xlsx_files_interface_1 = __importDefault(require("../../../infrastructure/files/xlsx.files.interface"));
const winston_logs_1 = __importDefault(require("../../../infrastructure/logs/winston.logs"));
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
            const user = yield listID_client_usecase_1.default.execute({
                id: Number(request.params.clientID)
            });
            if (user) {
                winston_logs_1.default.info(['Cliente encontrado:', user]);
                next();
            }
            else {
                winston_logs_1.default.error([`Relatório: ID-${request.params.idClient} não encontrado, tente novamente.`]);
                response.status(404).send({ error: `Relatório: ID-${request.params.idClient} não encontrado, tente novamente.` });
            }
        });
    }
    //Arrumar validações
    validateClientRepeated(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //Foi usado um if mais simples
            let id = ('cpf' in request.body ? request.body.cpf : request.body.cnpj);
            const user = yield listID_client_usecase_1.default.execute({ id });
            if (!user) {
                next();
            }
            else {
                response.status(404).send({ error: `CPF-CNPJ: ${id} já existe, faça o login ou acione o suporte` });
            }
        });
    }
    uploadFile() {
        //Por padrão o multer já faz um next() dentro dele
        return (0, multer_1.default)({
            storage: multer_1.default.diskStorage({
                destination: (request, file, cb) => {
                    cb(null, path_1.default.resolve('uploads'));
                },
                filename: (request, file, cb) => {
                    cb(null, `${Date.now()}-${file.originalname.toLocaleLowerCase()}`);
                }
            })
        });
    }
    parseXlsx(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            request.body.fileData = xlsx_files_interface_1.default.parse(request.file.path);
            console.log(xlsx_files_interface_1.default.parse(request.file.path));
            console.log('----------------------');
            next();
        });
    }
}
exports.default = new ClientsMiddleware();
//Os bloqueios entre middleware e DAOS servem do mesmo, porem no DAOS é obrigatória, no Middleware é para questão de performace
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50cy5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FkYXB0ZXJzL2FwaXMvbWlkZGxld2FyZXMvY2xpZW50cy5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvR0FBb0c7Ozs7Ozs7Ozs7Ozs7O0FBR3BHLHVFQUF1RTtBQUN2RSxrREFBMEI7QUFDMUIsbUhBQXlGO0FBQ3pGLG9EQUE0QjtBQUM1QixnREFBdUI7QUFDdkIsOEdBQW9GO0FBQ3BGLDZGQUErRDtBQUUvRCxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsd0JBQXdCLENBQUMsQ0FBQTtBQUU1RCxNQUFNLGlCQUFpQjtJQUNuQixnREFBZ0Q7SUFDaEQsdUJBQXVCO0lBQ2pCLGdDQUFnQyxDQUFDLE9BQXdCLEVBQUUsUUFBMEIsRUFBRSxJQUEwQjs7WUFDbkgsMENBQTBDO1lBQzFDLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pELElBQUksRUFBRSxDQUFDO2FBQ1Y7aUJBQU07Z0JBQ0gsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsdUNBQXVDLEVBQUUsQ0FBQyxDQUFDO2FBQ2pGO1FBQ0wsQ0FBQztLQUFBO0lBQ0ssbUJBQW1CLENBQUMsT0FBd0IsRUFBRSxRQUEwQixFQUFFLElBQTBCOztZQUN0RyxNQUFNLElBQUksR0FBRyxNQUFNLCtCQUFtQixDQUFDLE9BQU8sQ0FBQztnQkFDM0MsRUFBRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzthQUN0QyxDQUFDLENBQUM7WUFDSCxJQUFJLElBQUksRUFBRTtnQkFDTixzQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLHFC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