"use strict";
//Definir a regra de negócio [Factory], assim independente da API que eu usar, eles vão seguir a mesma regra de negócio (de procurar o endereço a partir do CEP)
Object.defineProperty(exports, "__esModule", { value: true });
exports.CepFactory = void 0;
class CepFactory {
    preencherEndereco(cep) {
        const cepAdquirido = this.factoryMethod();
        return cepAdquirido.buscaEndereco(cep);
    }
}
exports.CepFactory = CepFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VwZmFjdG9yeS5hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYWRhcHRlcnMvY29ubmVjdG9ycy9jZXBmYWN0b3J5LmFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsZ0tBQWdLOzs7QUFLaEssTUFBc0IsVUFBVTtJQUlyQixpQkFBaUIsQ0FBQyxHQUFXO1FBQ2hDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUUxQyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNKO0FBVEQsZ0NBU0MifQ==