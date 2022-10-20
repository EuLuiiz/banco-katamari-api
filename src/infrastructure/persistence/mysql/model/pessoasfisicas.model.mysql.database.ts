import { MySqlDatabase } from "../mysql.database";
import { DataTypes } from 'sequelize'

export default MySqlDatabase.getInstance().createModel(
    'pessoas_fisicas',
    {
        pessoa_fisica_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING,
        id_da_pessoa: DataTypes.INTEGER
    }
)