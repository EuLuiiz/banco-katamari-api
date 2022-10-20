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
exports.ClientsRepository = void 0;
//Importando o banco de dados para quando for dado o New, ser iniciado e todos os seus métodos da interface Model funcionar devidamente
const mysql_database_1 = require("../../infrastructure/persistence/mysql/mysql.database");
//Model das tabelas
const pessoas_model_mysql_database_1 = __importDefault(require("../../infrastructure/persistence/mysql/model/pessoas.model.mysql.database"));
const enderecos_model_mysql_database_1 = __importDefault(require("../../infrastructure/persistence/mysql/model/enderecos.model.mysql.database"));
const pessoasfisicas_model_mysql_database_1 = __importDefault(require("../../infrastructure/persistence/mysql/model/pessoasfisicas.model.mysql.database"));
const pessoasjuridicas_model_mysql_database_1 = __importDefault(require("../../infrastructure/persistence/mysql/model/pessoasjuridicas.model.mysql.database"));
//Os arquivos que vão tratar os dados da requisição ou da resposta
const entitiesToModels_mysql_database_1 = __importDefault(require("../../infrastructure/persistence/mysql/helpers/clients/entitiesToModels.mysql.database"));
const modelsToEntities_mysql_database_1 = __importDefault(require("../../infrastructure/persistence/mysql/helpers/clients/modelsToEntities.mysql.database"));
class ClientsRepository {
    //O constructor agora recebe os parametros os model que ela vai usar
    constructor(_database, _modelPessoas, _modelPessoasFisicas, _modelPessoasJuridicas, _modelEnderecos) {
        this._database = _database;
        this._modelPessoas = _modelPessoas;
        this._modelPessoasFisicas = _modelPessoasFisicas;
        this._modelPessoasJuridicas = _modelPessoasJuridicas;
        this._modelEnderecos = _modelEnderecos;
        //Informando suas relações (1 to N)
        this._modelPessoas.hasOne(this._modelPessoasFisicas, {
            foreignKey: 'id_da_pessoa',
            as: 'pessoaFisica'
        });
        this._modelPessoas.hasOne(this._modelPessoasJuridicas, {
            foreignKey: 'id_da_pessoa',
            as: 'pessoaJuridica'
        });
        this._modelPessoas.hasOne(this._modelEnderecos, {
            foreignKey: 'id_da_pessoa',
            as: 'endereco'
        });
    }
    //Métodos
    create(dados) {
        return __awaiter(this, void 0, void 0, function* () {
            //As informações da requisição será convertida para o formado do banco e separado
            //Como no banco de dados são 4 tabelas de dados, separamos todo o objeto da requisição de forma com que esteja no mesmo modelo das tabelas
            const { pessoa, pessoaFisica, pessoaJuridica, endereco } = (0, entitiesToModels_mysql_database_1.default)(dados);
            //Chamando o método configurado na database informando também a pessoa separada
            const pessoaModel = yield this._database.create(this._modelPessoas, pessoa);
            //Se for uma pessoa fisica, vai chamar o método para criar na tabela a pessoa fisica
            if (pessoaFisica) {
                pessoaFisica.id_da_pessoa = pessoaModel.null;
                const pessoaFisicaModel = yield this._database.create(this._modelPessoasFisicas, pessoaFisica);
            }
            //O mesmo com a pessoa juridica
            if (pessoaJuridica) {
                pessoaJuridica.id_da_pessoa = pessoaModel.null;
                const pessoaJuridicaModel = yield this._database.create(this._modelPessoasJuridicas, pessoaJuridica);
            }
            //O mesmo para endereço
            if (endereco) {
                endereco.id_da_pessoa = pessoaModel.null;
                const enderecoModel = yield this._database.create(this._modelEnderecos, endereco);
            }
            //Retornando os dados que foi criado
            return dados;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const listaClientes = yield this._database.list(this._modelPessoas, {
                include: [
                    'pessoaFisica',
                    'pessoaJuridica',
                    'endereco'
                ]
            });
            //percorrer por todos os clientes encontrados (acima) e convertidos com a função
            const clients = listaClientes.map(modelsToEntities_mysql_database_1.default);
            //Retornando a lista convertida com todos os includes e tratamentos
            return clients;
        });
    }
    listID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //No database, vai usar o método de listar por ID, ultilizando o model de pessoas e mandando o ID como parametro, pedindo para incluir junto as outras informações da tabela caso tiver
                const cliente = yield this._database.listID(this._modelPessoas, id, {
                    include: [
                        'pessoaFisica',
                        'pessoaJuridica',
                        'endereco'
                    ]
                });
                console.log(cliente);
                //Vai pegar os dados que foi pego no banco de dados e 'converter' de uma forma que seja entendivel pela aplicação
                return (0, modelsToEntities_mysql_database_1.default)(cliente);
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    update(dados) {
        return __awaiter(this, void 0, void 0, function* () {
            //O update é uma mistura de create com listID
            //Com o listID vai armazenar toda a informação encontrada
            //Depois vai converter os dados e ir atualializando tabela por tabela
            let pessoaModel = yield this._database.listID(this._modelPessoas, dados.pessoa_id, {
                include: [
                    'pessoaFisica',
                    'pessoaJuridica',
                    'endereco'
                ]
            });
            const { pessoa, pessoaFisica, pessoaJuridica, endereco } = (0, entitiesToModels_mysql_database_1.default)(dados);
            yield this._database.update(pessoaModel, pessoa);
            if (pessoaFisica) {
                yield this._database.update(yield pessoaModel.getPessoaFisica(), pessoaFisica);
            }
            if (pessoaJuridica) {
                yield this._database.update(yield pessoaModel.getPessoaJuridica(), pessoaJuridica);
            }
            if (endereco) {
                yield this._database.update(yield pessoaModel.getEnderecos(), endereco);
            }
            //Retorna os dados atualizados
            return dados;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._database.delete(this._modelPessoasFisicas, { id_da_pessoa: id });
            yield this._database.delete(this._modelPessoasJuridicas, { id_da_pessoa: id });
            yield this._database.delete(this._modelEnderecos, { id_da_pessoa: id });
            yield this._database.delete(this._modelPessoas, { pessoa_id: id });
        });
    }
}
exports.ClientsRepository = ClientsRepository;
exports.default = new ClientsRepository(mysql_database_1.MySqlDatabase.getInstance(), pessoas_model_mysql_database_1.default, pessoasfisicas_model_mysql_database_1.default, pessoasjuridicas_model_mysql_database_1.default, enderecos_model_mysql_database_1.default);
/**
 * Explicando os exports do Model em geral:
    No constructor foi criado variaveis privadas para [Explicação]
    Assim, para poder de fato usar os tais model, cria-se junto com a exportação, os model importado
 */ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50cy5yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FkYXB0ZXJzL3JlcG9zaXRvcmllcy9jbGllbnRzLnJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsdUlBQXVJO0FBQ3ZJLDBGQUFzRjtBQUd0RixtQkFBbUI7QUFDbkIsNklBQXFHO0FBQ3JHLGlKQUF5RztBQUN6RywySkFBbUg7QUFDbkgsK0pBQXVIO0FBQ3ZILGtFQUFrRTtBQUNsRSw2SkFBc0g7QUFDdEgsNkpBQXNIO0FBRXRILE1BQWEsaUJBQWlCO0lBQzFCLG9FQUFvRTtJQUNwRSxZQUNZLFNBQXlCLEVBQ3pCLGFBQTZELEVBQzdELG9CQUFvRSxFQUNwRSxzQkFBc0UsRUFDdEUsZUFBK0Q7UUFKL0QsY0FBUyxHQUFULFNBQVMsQ0FBZ0I7UUFDekIsa0JBQWEsR0FBYixhQUFhLENBQWdEO1FBQzdELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBZ0Q7UUFDcEUsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUFnRDtRQUN0RSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0Q7UUFFdkUsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUNqRCxVQUFVLEVBQUUsY0FBYztZQUMxQixFQUFFLEVBQUUsY0FBYztTQUNyQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDbkQsVUFBVSxFQUFFLGNBQWM7WUFDMUIsRUFBRSxFQUFFLGdCQUFnQjtTQUN2QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQzVDLFVBQVUsRUFBRSxjQUFjO1lBQzFCLEVBQUUsRUFBRSxVQUFVO1NBQ2pCLENBQUMsQ0FB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