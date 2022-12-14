"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Todas as configurações básicas da API, inicio de tudo
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
//Gerar log
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
//evitar erro cors
const cors_1 = __importDefault(require("cors"));
//Debug
const debug_1 = __importDefault(require("debug"));
const clients_routes_config_1 = require("../../../adapters/apis/routes/clients.routes.config");
const accounts_routes_config_1 = require("../../../adapters/apis/routes/accounts.routes.config");
// import { AccountsRoutes } from './account/accounts.routes.config';
//Iniciando a Aplicação
const app = (0, express_1.default)();
//Iniciando o Servidor
const server = http.createServer(app);
//Porta
const port = 3000;
//Rotas
//Informando que as rotas será um array de várias rotas usando a regra do CommonRoutesConfig
const routes = [];
//Configurando Debug
const debugLog = (0, debug_1.default)('app');
//Usos da api
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)());
//Log
const loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true }))
};
//Configurando o tipo de log (se vai mostrar um log todo trabalhado ou simples)
if (!process.env.DEBUG) {
    loggerOptions.meta = false;
}
app.use(expressWinston.logger(loggerOptions));
//
//Adicionando a rota de clientes no array usando no app
routes.push(new clients_routes_config_1.ClientsRoutes(app));
routes.push(new accounts_routes_config_1.AccountsRoutes(app));
const runningMensage = `Servidor: OK [Porta: ${port}]`;
//Uma rota simples apenas para testar se está funcionando
app.get('/', (request, response) => {
    response.status(200).send(runningMensage);
});
//Listen (Iniciando o servidor de fato)
server.listen(port, () => {
    routes.forEach((route) => {
        //Vai percorrer toda a lista de rotas criadas e informar elas no log, informando que está funcionando
        debugLog(`Rotas configuradas: ${route.getName}`);
    });
    console.log(runningMensage);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaXMvYXBwL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXVEO0FBQ3ZELHNEQUE4QjtBQUM5QiwyQ0FBNkI7QUFFN0IsV0FBVztBQUNYLGlEQUFtQztBQUNuQyxnRUFBa0Q7QUFDbEQsa0JBQWtCO0FBQ2xCLGdEQUF3QjtBQUN4QixPQUFPO0FBQ1Asa0RBQTBCO0FBSTFCLCtGQUFvRjtBQUNwRixpR0FBc0Y7QUFDdEYscUVBQXFFO0FBRXJFLHVCQUF1QjtBQUN2QixNQUFNLEdBQUcsR0FBd0IsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFDM0Msc0JBQXNCO0FBQ3RCLE1BQU0sTUFBTSxHQUFnQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELE9BQU87QUFDUCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFDbEIsT0FBTztBQUNQLDRGQUE0RjtBQUM1RixNQUFNLE1BQU0sR0FBeUIsRUFBRSxDQUFDO0FBQ3hDLG9CQUFvQjtBQUNwQixNQUFNLFFBQVEsR0FBb0IsSUFBQSxlQUFLLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFFL0MsYUFBYTtBQUNiLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQzlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEdBQUUsQ0FBQyxDQUFDO0FBRWhCLEtBQUs7QUFDTCxNQUFNLGFBQWEsR0FBaUM7SUFDaEQsVUFBVSxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFDckIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFDNUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDekM7Q0FDSixDQUFBO0FBRUQsK0VBQStFO0FBQy9FLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRTtJQUNwQixhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztDQUM5QjtBQUNELEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBQzlDLEVBQUU7QUFFRix1REFBdUQ7QUFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHFDQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksdUNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRXJDLE1BQU0sY0FBYyxHQUFHLHdCQUF3QixJQUFJLEdBQUcsQ0FBQztBQUN2RCx5REFBeUQ7QUFDekQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUF3QixFQUFFLFFBQTBCLEVBQUUsRUFBRTtJQUNsRSxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM5QyxDQUFDLENBQUMsQ0FBQTtBQUVGLHVDQUF1QztBQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQXlCLEVBQUUsRUFBRTtRQUN6QyxxR0FBcUc7UUFDckcsUUFBUSxDQUFDLHVCQUF1QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDL0IsQ0FBQyxDQUFDLENBQUMifQ==