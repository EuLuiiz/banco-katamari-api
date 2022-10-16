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
exports.ApiCep = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
class ApiCep {
    buscaEndereco(cep) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cepResponse = yield (0, cross_fetch_1.default)(`https://cdn.apicep.com/file/apicep/${cep.slice(0, 5)}-${cep.slice(5, 8)}.json`);
                if (cepResponse.status != 200) {
                    return;
                }
                const cepInfo = yield cepResponse.json();
                return {
                    cep: cepInfo.code,
                    logradouro: cepInfo.addrress,
                    bairro: cepInfo.district,
                    cidade: cepInfo.city,
                    estado: cepInfo.state
                };
            }
            catch (error) {
                return;
            }
        });
    }
}
exports.ApiCep = ApiCep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpY2VwLmFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9hcGlzL2NlcC9hcGljZXAuYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDhEQUFnQztBQUVoQyxNQUFhLE1BQU07SUFDRixhQUFhLENBQUMsR0FBVzs7WUFDbEMsSUFBSTtnQkFFQSxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUEscUJBQUssRUFBQyxzQ0FBc0MsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUVoSCxJQUFJLFdBQVcsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO29CQUMzQixPQUFPO2lCQUNWO2dCQUVELE1BQU0sT0FBTyxHQUFRLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUU5QyxPQUFPO29CQUNILEdBQUcsRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDakIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxRQUFRO29CQUM1QixNQUFNLEVBQUUsT0FBTyxDQUFDLFFBQVE7b0JBQ3hCLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSTtvQkFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLO2lCQUN4QixDQUFBO2FBQ0o7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixPQUFNO2FBQ1Q7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQXZCRCx3QkF1QkMifQ==