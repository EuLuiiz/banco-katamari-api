//Arquivo contendo todas as informações e métodos do MySql declarado
import { MySqlDatabase } from '../mysql.database';
//S E Q U E L I Z E    : D
import { DataTypes } from 'sequelize';

export default MySqlDatabase.getInstance().createModel(
    'pessoas',
    {
        pessoa_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        cep: DataTypes.STRING,
        limite_credito: DataTypes.INTEGER,
        observacao: DataTypes.TEXT
    }
)

/**
 * FIELD

    Caso usar desse jeito:
    indexId: {
        type: DataTypes.INTEGER,
        primaryKey: true
        field: 'pessoa_id'
    }

    Significa que nna aplicação vou usar indexId para se referir ao id pessoa_id do banco
 */