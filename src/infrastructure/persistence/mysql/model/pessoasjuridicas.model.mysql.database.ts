import { MySqlDatabase } from "../mysql.database";
import { DataTypes } from 'sequelize'

export default MySqlDatabase.getInstance().createModel(
    'pessoas_juridicas',
    {
        pessoa_juridica_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        razao_social: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        pessoa_id: DataTypes.INTEGER
    }
)