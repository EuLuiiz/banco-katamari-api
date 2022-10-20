//Arquivo para configurações das Rotas dos clientes

//Importando as Rotas comum (para servir como se fosse uma regra de rotas)
import { CommonRoutesConfig } from "./common.routes.config";
import ClientsController from '../controllers/clients.controller';
import ClientsMiddlewares from '../middlewares/clients.middleware'
import express from "express";

export class ClientsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ClientsRoutes');
    }

    configureRoutes(): express.Application {
        //Estou criando uma rota (/clients) e especificando os métodos dessa rota
        //Um registro de todas as ações dessa rota
        this.app.route('/clients')
            .get(ClientsController.list)
            .post(
                ClientsMiddlewares.validateRequiredClientBodyFields,
                ClientsMiddlewares.validateClientRepeated,
                ClientsController.create);

        //Rota para enviar arquivos
        this.app.route('/clients/bulk')
            .post(
                ClientsMiddlewares.uploadFile().single('file'),
                ClientsMiddlewares.parseXlsx,
                ClientsController.createClientBulk
            ) //A função do tipo multer(uploadFile), vai receber um arquivo (single)

        this.app.route('/clients/:clientID')
            .all(ClientsMiddlewares.validateClientExist)
            .get(ClientsController.listID)
            .put(
                ClientsMiddlewares.validateRequiredClientBodyFields,
                ClientsController.update)
            .delete(ClientsController.delete);

        return this.app;
    }
}