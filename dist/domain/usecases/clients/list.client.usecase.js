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
const clients_repository_1 = __importDefault(require("../../../adapters/repositories/clients.repository"));
class listClientsUseCase {
    constructor(_repository) {
        this._repository = _repository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repository.list();
        });
    }
}
//Inicia-se colocando como parametro o ClientsRepository para que possa ser usado no constructor e ter o repositório
exports.default = new listClientsUseCase(clients_repository_1.default);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jbGllbnQudXNlY2FzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb21haW4vdXNlY2FzZXMvY2xpZW50cy9saXN0LmNsaWVudC51c2VjYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkdBQWtGO0FBS2xGLE1BQU0sa0JBQWtCO0lBQ3BCLFlBQW9CLFdBQStCO1FBQS9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtJQUVuRCxDQUFDO0lBRUssT0FBTzs7WUFDVCxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUN4QyxDQUFDO0tBQUE7Q0FDSjtBQUVELG9IQUFvSDtBQUNwSCxrQkFBZSxJQUFJLGtCQUFrQixDQUFDLDRCQUFpQixDQUFDLENBQUEifQ==