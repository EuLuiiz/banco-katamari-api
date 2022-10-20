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
        //Rota para enviar arquivos
        this.app.route('/clients/bulk')
            .post(clients_middleware_1.default.uploadFile().single('file'), clients_middleware_1.default.parseXlsx, clients_controller_1.default.createClientBulk); //A função do tipo multer(uploadFile), vai receber um arquivo (single)
        this.app.route('/clients/:clientID')
            .all(clients_middleware_1.default.validateClientExist)
            .get(clients_controller_1.default.listID)
            .put(clients_middleware_1.default.validateRequiredClientBodyFields, clients_controller_1.default.update)
            .delete(clients_controller_1.default.delete);
        return this.app;
    }
}
exports.ClientsRoutes = ClientsRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50cy5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FkYXB0ZXJzL2FwaXMvcm91dGVzL2NsaWVudHMucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsbURBQW1EOzs7Ozs7QUFFbkQsMEVBQTBFO0FBQzFFLGlFQUE0RDtBQUM1RCwyRkFBa0U7QUFDbEUsMkZBQWtFO0FBR2xFLE1BQWEsYUFBYyxTQUFRLHlDQUFrQjtJQUNqRCxZQUFZLEdBQXdCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELGVBQWU7UUFDWCx5RUFBeUU7UUFDekUsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzthQUNyQixHQUFHLENBQUMsNEJBQWlCLENBQUMsSUFBSSxDQUFDO2FBQzNCLElBQUksQ0FDRCw0QkFBa0IsQ0FBQyxnQ0FBZ0MsRUFDbkQsNEJBQWtCLENBQUMsc0JBQXNCLEVBQ3pDLDRCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWxDLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7YUFDMUIsSUFBSSxDQUNELDRCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFDOUMsNEJBQWtCLENBQUMsU0FBUyxFQUM1Qiw0QkFBaUIsQ0FBQyxnQkFBZ0IsQ0FDckMsQ0FBQSxDQUFDLHNFQUFzRTtRQUU1RSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQzthQUMvQixHQUFHLENBQUMsNEJBQWtCLENBQUMsbUJBQW1CLENBQUM7YUFDM0MsR0FBRyxDQUFDLDRCQUFpQixDQUFDLE1BQU0sQ0FBQzthQUM3QixHQUFHLENBQ0EsNEJBQWtCLENBQUMsZ0NBQWdDLEVBQ25ELDRCQUFpQixDQUFDLE1BQU0sQ0FBQzthQUM1QixNQUFNLENBQUMsNEJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQWpDRCxzQ0FpQ0MifQ==