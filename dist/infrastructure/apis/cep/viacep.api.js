"use strict";
//Arquivo que faz a conexão com a API externa, e informando a forma como salva as informações baseadas nas Interfaces e DTO
//Arquivo que tem configurado o método para pegar o CEP
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
exports.ViaCep = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
class ViaCep {
    buscaEndereco(cep) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cepResponse = yield (0, cross_fetch_1.default)(`viacep.com.br/ws/${cep}/json/`);
                if (cepResponse.status != 200) {
                    return;
                }
                const cepInfo = yield cepResponse.json();
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
                };
            }
            catch (error) {
                return;
            }
        });
    }
}
exports.ViaCep = ViaCep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlhY2VwLmFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9hcGlzL2NlcC92aWFjZXAuYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwySEFBMkg7QUFDM0gsdURBQXVEOzs7Ozs7Ozs7Ozs7Ozs7QUFJdkQsOERBQWdDO0FBRWhDLE1BQWEsTUFBTTtJQUNGLGFBQWEsQ0FBQyxHQUFXOztZQUNsQyxJQUFJO2dCQUNBLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBQSxxQkFBSyxFQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxDQUFDO2dCQUVqRSxJQUFJLFdBQVcsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO29CQUMzQixPQUFPO2lCQUNWO2dCQUVELE1BQU0sT0FBTyxHQUFRLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUU5QyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7b0JBQ25CLE9BQU87aUJBQ1Y7Z0JBRUQsT0FBTztvQkFDSCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7b0JBQ2hCLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVTtvQkFDOUIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO29CQUNoQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07b0JBQ3RCLE1BQU0sRUFBRSxPQUFPLENBQUMsVUFBVTtvQkFDMUIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFO2lCQUNyQixDQUFBO2FBRUo7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixPQUFPO2FBQ1Y7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQTVCRCx3QkE0QkMifQ==