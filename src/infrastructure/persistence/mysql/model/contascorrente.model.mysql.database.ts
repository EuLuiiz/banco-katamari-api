import { MySqlDatabase } from "../mysql.database";
import { DataTypes } from "sequelize";

export default MySqlDatabase.getInstance().createModel(
    'contas_corrente',
    {
        conta_corrente_id:{
            type:DataTypes.INTEGER,
            primaryKey:true
        },
        limite:DataTypes.INTEGER,
        numero_da_conta:DataTypes.INTEGER,
        id_da_conta:DataTypes.INTEGER
    }
)