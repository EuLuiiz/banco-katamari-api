"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayDatabase = void 0;
class ArrayDatabase {
    constructor() {
        //Criando o banco de dados vazio antes de armazenar as informações
        this._data = {};
    }
    //DP - Singleton, Fazendo ter apenas uma conexão com o banco
    static getInstance() {
        if (!ArrayDatabase._instance) {
            ArrayDatabase._instance = new ArrayDatabase();
        }
        return ArrayDatabase._instance;
    }
    create(type, data) {
        let obj;
        if (this._data[type] === undefined) {
            this._data[type] = [];
        }
        data.indexId = this._data[type] ? this._data[type].length : 0;
        obj = data;
        this._data[type].push(obj);
        return obj.indexId;
    }
    update(type, data) {
        let obj;
        obj = data;
        if (obj.indexId === undefined)
            return false;
        this._data[type][obj.indexId] = obj;
        return obj;
    }
    list(type) {
        let objs = [];
        if (this._data[type] === undefined) {
            return [];
        }
        for (let data of this._data[type])
            objs.push(data);
        return objs;
    }
    delete(type, dataId) {
        if (this._data[type] === undefined) {
            return false;
        }
        const indexId = this._data.findIndex((obj) => {
            return obj.indexId === dataId;
        });
        if (indexId === undefined)
            return false;
        this._data[type].splice(indexId, 1);
        return true;
    }
    listID(type, dataId) {
        if (this._data[type] === undefined) {
            return undefined;
        }
        const data = this._data[type].find((obj) => {
            return obj.indexId === dataId;
        });
        if (!data)
            return false;
        return data;
    }
}
exports.ArrayDatabase = ArrayDatabase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvcGVyc2lzdGVuY2UvYXJyYXlEQi9hcnJheS5kYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxNQUFhLGFBQWE7SUFLdEI7UUFDSSxrRUFBa0U7UUFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELDREQUE0RDtJQUNyRCxNQUFNLENBQUMsV0FBVztRQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRTtZQUMxQixhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7U0FDakQ7UUFFRCxPQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZLEVBQUUsSUFBUztRQUMxQixJQUFJLEdBQVEsQ0FBQztRQUViLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUM7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDekI7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUN2QixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVksRUFBRSxJQUFTO1FBQzFCLElBQUksR0FBUSxDQUFDO1FBRWIsR0FBRyxHQUFHLElBQUksQ0FBQztRQUVYLElBQUcsR0FBRyxDQUFDLE9BQU8sS0FBSyxTQUFTO1lBQ3hCLE9BQU8sS0FBSyxDQUFDO1FBRWpCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUVwQyxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBWTtRQUNiLElBQUksSUFBSSxHQUFVLEVBQUUsQ0FBQztRQUVyQixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFDO1lBQzlCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxLQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZLEVBQUUsTUFBYztRQUUvQixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFDO1lBQzlCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUMxQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBR0gsSUFBRyxPQUFPLEtBQUssU0FBUztZQUNwQixPQUFPLEtBQUssQ0FBQztRQUVqQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFcEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZLEVBQUUsTUFBYztRQUUvQixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFDO1lBQzlCLE9BQU8sU0FBUyxDQUFDO1NBQ3BCO1FBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtZQUN4QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBRyxDQUFDLElBQUk7WUFDSixPQUFPLEtBQUssQ0FBQztRQUVqQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUE3RkQsc0NBNkZDIn0=