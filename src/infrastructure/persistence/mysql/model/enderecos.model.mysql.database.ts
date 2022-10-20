import { MySqlDatabase } from "../mysql.database";
import { DataTypes } from 'sequelize'

export default MySqlDatabase.getInstance().createModel(
    'enderecos',
    {
        endereco_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        cep: DataTypes.STRING,
        logradouro: DataTypes.STRING,
        complemento: DataTypes.STRING,
        bairro: DataTypes.STRING,
        cidade: DataTypes.STRING,
        estado: DataTypes.STRING,
        id_da_pessoa:DataTypes.INTEGER
    }
)