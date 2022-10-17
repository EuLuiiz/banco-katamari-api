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
class updateClientUseCase {
    constructor(_repository) {
        this._repository = _repository;
    }
    execute(dados) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._repository.update(dados);
        });
    }
}
exports.default = new updateClientUseCase(clients_repository_1.default);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmNsaWVudC51c2VjYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2RvbWFpbi91c2VjYXNlcy9jbGllbnRzL3VwZGF0ZS5jbGllbnQudXNlY2FzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDJHQUFrRjtBQUtsRixNQUFNLG1CQUFtQjtJQUNyQixZQUFvQixXQUE4QjtRQUE5QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7SUFFbEQsQ0FBQztJQUNLLE9BQU8sQ0FBQyxLQUFrQjs7WUFDNUIsT0FBTyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQy9DLENBQUM7S0FBQTtDQUNKO0FBRUQsa0JBQWUsSUFBSSxtQkFBbUIsQ0FBQyw0QkFBaUIsQ0FBQyxDQUFDIn0=