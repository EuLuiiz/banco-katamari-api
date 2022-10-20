import { CommonRoutesConfig } from "./common.routes.config";
import express from 'express'
import accountsController from "../controllers/accounts.controller";

export class AccountsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AccounstRoutes')
    }

    configureRoutes(): express.Application {
        this.app.route('/accounts')
            .get(accountsController.list)
            .post(accountsController.create)

        this.app.route('/accounts/:accountID')
            .get(accountsController.listID)
            .put(accountsController.update)
            .delete(accountsController.delete)

        return this.app
    }

}