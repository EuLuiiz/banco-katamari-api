import { MySqlDatabase } from "../mysql.database";
import { DataTypes } from "sequelize";

export default MySqlDatabase.getInstance().createModel(
    'contas',
    {
        conta_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        saldo: DataTypes.INTEGER,
        numero_da_conta: DataTypes.INTEGER,
        id_da_pessoa: DataTypes.INTEGER
    }
)