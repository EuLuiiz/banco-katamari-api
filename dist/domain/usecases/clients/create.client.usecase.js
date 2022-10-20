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
exports.CreateClientUseCase = void 0;
const clients_repository_1 = __importDefault(require("../../../adapters/repositories/clients.repository"));
const viacepfactory_api_1 = require("../../../infrastructure/apis/cep/viacepfactory.api");
const apicepfactory_api_1 = require("../../../infrastructure/apis/cep/apicepfactory.api");
class CreateClientUseCase {
    constructor(_repository, _viaCep, _apiCep) {
        this._repository = _repository;
        this._viaCep = _viaCep;
        this._apiCep = _apiCep;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.endereco = yield this._viaCep.preencherEndereco(data.cep);
            if (!data.endereco) {
                data.endereco = yield this._apiCep.preencherEndereco(data.cep);
            }
            if (!data.endereco) {
                data.endereco = {
                    cep: "00000000",
                    logradouro: undefined,
                    complemento: undefined,
                    bairro: 'Bairro Teste',
                    cidade: 'Cidade Offline',
                    estado: 'SEM-NET'
                };
            }
            return yield this._repository.create(data);
        });
    }
}
exports.CreateClientUseCase = CreateClientUseCase;
exports.default = new CreateClientUseCase(clients_repository_1.default, new viacepfactory_api_1.ViaCepFactory(), new apicepfactory_api_1.ApiCepFactory());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmNsaWVudC51c2VjYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RvbWFpbi91c2VjYXNlcy9jbGllbnRzL2NyZWF0ZS5jbGllbnQudXNlY2FzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFFQSwyR0FBa0Y7QUFFbEYsMEZBQW1GO0FBQ25GLDBGQUFtRjtBQUduRixNQUFhLG1CQUFtQjtJQUU1QixZQUFvQixXQUErQixFQUFVLE9BQW1CLEVBQVUsT0FBbUI7UUFBekYsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVk7SUFFN0csQ0FBQztJQUVLLE9BQU8sQ0FBQyxJQUFrQjs7WUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRS9ELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEU7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRztvQkFDWixHQUFHLEVBQUUsVUFBVTtvQkFDZixVQUFVLEVBQUUsU0FBUztvQkFDckIsV0FBVyxFQUFFLFNBQVM7b0JBQ3RCLE1BQU0sRUFBRSxjQUFjO29CQUN0QixNQUFNLEVBQUUsZ0JBQWdCO29CQUN4QixNQUFNLEVBQUUsU0FBUztpQkFDcEIsQ0FBQTthQUNKO1lBQ0QsT0FBTyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7S0FBQTtDQUNKO0FBeEJELGtEQXdCQztBQUVELGtCQUFlLElBQUksbUJBQW1CLENBQ2xDLDRCQUFpQixFQUNqQixJQUFJLGlDQUFhLEVBQUUsRUFDbkIsSUFBSSxpQ0FBYSxFQUFFLENBQ3RCLENBQUMifQ==