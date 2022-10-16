"use strict";
//Arquivo para configurações das Rotas dos clientes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsRoutes = void 0;
//Importando as Rotas comum (para servir como se fosse uma regra de rotas)
const common_routes_config_1 = require("./common.routes.config");
const clients_controller_1 = __importDefault(require("../controllers/clients.controller"));
const clients_middleware_1 = __importDefault(require("../middlewares/clients.middleware"));
class ClientsRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'ClientsRoutes');
    }
    configureRoutes() {
        //Estou criando uma rota (/clients) e especificando os métodos dessa rota
        //Um registro de todas as ações dessa rota
        this.app.route('/clients')
            .get(clients_controller_1.default.list)
            .post(clients_middleware_1.default.validateRequiredClientBodyFields, clients_middleware_1.default.validateClientRepeated, clients_controller_1.default.create);
        this.app.route('/clients/:idClient')
            .all(clients_middleware_1.default.validateClientExist)
            .get(clients_controller_1.default.listID)
            .put(clients_middleware_1.default.validateRequiredClientBodyFields, clients_controller_1.default.update)
            .delete(clients_controller_1.default.delete);
        return this.app;
    }
}
exports.ClientsRoutes = ClientsRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50cy5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FkYXB0ZXJzL2FwaXMvcm91dGVzL2NsaWVudHMucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsbURBQW1EOzs7Ozs7QUFFbkQsMEVBQTBFO0FBQzFFLGlFQUE0RDtBQUM1RCwyRkFBa0U7QUFDbEUsMkZBQWtFO0FBR2xFLE1BQWEsYUFBYyxTQUFRLHlDQUFrQjtJQUNqRCxZQUFZLEdBQXdCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELGVBQWU7UUFDWCx5RUFBeUU7UUFDekUsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzthQUNyQixHQUFHLENBQUMsNEJBQWlCLENBQUMsSUFBSSxDQUFDO2FBQzNCLElBQUksQ0FDRCw0QkFBa0IsQ0FBQyxnQ0FBZ0MsRUFDbkQsNEJBQWtCLENBQUMsc0JBQXNCLEVBQ3pDLDRCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWxDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO2FBQy9CLEdBQUcsQ0FBQyw0QkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQzthQUMzQyxHQUFHLENBQUMsNEJBQWlCLENBQUMsTUFBTSxDQUFDO2FBQzdCLEdBQUcsQ0FDQSw0QkFBa0IsQ0FBQyxnQ0FBZ0MsRUFDbkQsNEJBQWlCLENBQUMsTUFBTSxDQUFDO2FBQzVCLE1BQU0sQ0FBQyw0QkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBekJELHNDQXlCQyJ9