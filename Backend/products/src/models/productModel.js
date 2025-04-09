import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define('Product',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    dimensions_width:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    dimensions_height:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    dimensions_depth:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    dimensions_type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    weight_num: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    weight_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productMarlk: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    material: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creationDate: {
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue:true,
    },

}, {
    timestamps:false, //Desactiva createdAt y ipdatedAt
    tableName: 'products', //Nombre de la tabla de bd
});

sequelize.sync({ alter: true })
    .then(() => console.log("Tabla 'products' sincronizada correctamente"))
    .catch(err => console.error("Error al sincronizar la tabla 'users':", err));

export default Product;