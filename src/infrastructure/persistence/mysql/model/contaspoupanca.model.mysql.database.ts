import { MySqlDatabase } from "../mysql.database";
import { DataTypes } from "sequelize";

export default MySqlDatabase.getInstance().createModel(
    'contas_poupanca',
    {
        conta_poupanca_id:{
            type:DataTypes.INTEGER,
            primaryKey:true
        },
        rendimento:DataTypes.INTEGER,
        numero_da_conta:DataTypes.INTEGER,
        id_da_conta:DataTypes.INTEGER
    }
)