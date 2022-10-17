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
// routes.push(new AccountsRoutes(app));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaXMvYXBwL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXVEO0FBQ3ZELHNEQUE4QjtBQUM5QiwyQ0FBNkI7QUFFN0IsV0FBVztBQUNYLGlEQUFtQztBQUNuQyxnRUFBa0Q7QUFDbEQsa0JBQWtCO0FBQ2xCLGdEQUF3QjtBQUN4QixPQUFPO0FBQ1Asa0RBQTBCO0FBSTFCLCtGQUFvRjtBQUNwRixxRUFBcUU7QUFFckUsdUJBQXVCO0FBQ3ZCLE1BQU0sR0FBRyxHQUF3QixJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUMzQyxzQkFBc0I7QUFDdEIsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsT0FBTztBQUNQLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztBQUNsQixPQUFPO0FBQ1AsNEZBQTRGO0FBQzVGLE1BQU0sTUFBTSxHQUF5QixFQUFFLENBQUM7QUFDeEMsb0JBQW9CO0FBQ3BCLE1BQU0sUUFBUSxHQUFvQixJQUFBLGVBQUssRUFBQyxLQUFLLENBQUMsQ0FBQztBQUUvQyxhQUFhO0FBQ2IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFDOUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQUksR0FBRSxDQUFDLENBQUM7QUFFaEIsS0FBSztBQUNMLE1BQU0sYUFBYSxHQUFpQztJQUNoRCxVQUFVLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUMxQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUNyQixPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUN6QztDQUNKLENBQUE7QUFFRCwrRUFBK0U7QUFDL0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO0lBQ3BCLGFBQWEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0NBQzlCO0FBQ0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDOUMsRUFBRTtBQUVGLHVEQUF1RDtBQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUkscUNBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLHdDQUF3QztBQUV4QyxNQUFNLGNBQWMsR0FBRyx3QkFBd0IsSUFBSSxHQUFHLENBQUM7QUFDdkQseURBQXlEO0FBQ3pELEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBd0IsRUFBRSxRQUEwQixFQUFFLEVBQUU7SUFDbEUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDLENBQUE7QUFFRix1Q0FBdUM7QUFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUF5QixFQUFFLEVBQUU7UUFDekMscUdBQXFHO1FBQ3JHLFFBQVEsQ0FBQyx1QkFBdUIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBQy9CLENBQUMsQ0FBQyxDQUFDIn0=