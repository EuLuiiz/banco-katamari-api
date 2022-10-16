"use strict";
//Arquivo base onde ficará todas as rotas básicas e comuns da API
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoutesConfig = void 0;
//Classe abstrata pois nunca vou ter uma rota Common, mas quero ter um padrão de rotas para usar com todos os elementos
class CommonRoutesConfig {
    constructor(app, name) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    //Função que vai retornar o nome da rota
    getName() {
        return this.name;
    }
}
exports.CommonRoutesConfig = CommonRoutesConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnJvdXRlcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYWRhcHRlcnMvYXBpcy9yb3V0ZXMvY29tbW9uLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlFQUFpRTs7O0FBS2pFLHVIQUF1SDtBQUN2SCxNQUFzQixrQkFBa0I7SUFDcEMsWUFBbUIsR0FBd0IsRUFBUyxJQUFZO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQXFCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUM1RCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxPQUFPO1FBQ0gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FJSjtBQVpELGdEQVlDIn0=