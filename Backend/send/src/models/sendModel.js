import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const send = sequelize.define('Send', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    weight_num: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    weight_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    packageDimensions_width: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    packageDimensions_height: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    packageDimensions_depth: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    packageDimensions_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    costumerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fragile: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    extraInformation: {
        type: DataTypes.STRING,
        allowNull: false,
    },   
    delivered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    deliveryDate: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue:true,
    },
    creationDate: {
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW,
    },
}, {
    timestamps: false,
    tableName: 'send',
});

sequelize.sync({ force: true }) 
    .then(() => console.log("Tabla 'send' sincronizada correctamente"))
    .catch(err => console.error("Error al sincronizar la tabla 'send':", err));

export default send;