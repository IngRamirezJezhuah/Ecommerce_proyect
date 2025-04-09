import Product from '../models/productModel.js';
import fs from 'fs';
import path from 'path';

export const saludar = async (req, res) => {
    try{
        return res.status(200).json({ message: "hola"});
    } catch (error) {
        return res.status(500).json({ message: "Error al saludar"});
    }
};

// Validar cadenas vacías
const isValidString = (value, maxLength = 255) => typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;

export const getProduct = async (req, res) => {
    try{
        const Products = await Product.findAll();

        res.status(200).json(Products);
    } catch (error) {
        console.error('Error en la sistama de productos: ', error);
        res.status(500)
            .json({ message: 'Error al obtener los productos' });
    }
};

export const createProduct = async (req, res) => {
    const { name, price, dimensions_width, dimensions_height, dimensions_depth, dimensions_type, weight_num, weight_type, description, productMarlk, material, photo } = req.body;

    // Validar que estén todos los campos
    const requiredFields = [
        'name', 'price', 'dimensions_width', 'dimensions_height', 'dimensions_depth', 
        'dimensions_type', 'weight_num', 'weight_type', 'description', 
        'productMarlk', 'material', 'photo'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Faltan los siguientes campos: ${missingFields.join(', ')}`
        });
    }

    //Validación name
    if (!isNaN(name)) {
        return res.status(400).json({ message: 'El name debe ser una cadena de caracteres' });
    }

    //Validación price
    if (isNaN(price)) {
        return res.status(400).json({ message: 'El price debe ser un número' });
    }
    if (price<=0) {
        return res.status(400).json({ message: 'El price debe ser un número positivo' });
    }

    //Validación dimensions_width
    if (isNaN(dimensions_width)) {
        return res.status(400).json({ message: 'El dimensions_width debe ser un número' });
    }
    if (dimensions_width<=0) {
        return res.status(400).json({ message: 'El dimensions_width debe ser un número positivo' });
    }

    //Validación dimensions_height
    if (isNaN(dimensions_height)) {
        return res.status(400).json({ message: 'El dimensions_height debe ser un número' });
    }
    if (dimensions_height<=0) {
        return res.status(400).json({ message: 'El dimensions_height debe ser un número positivo' });
    }

    //Validación dimensions_depth
    if (isNaN(dimensions_depth)) {
        return res.status(400).json({ message: 'El dimensions_depth debe ser un número' });
    }
    if (dimensions_depth<=0) {
        return res.status(400).json({ message: 'El dimensions_depth debe ser un número positivo' });
    }

    //Validación dimensions_type
    if (dimensions_type !== "m" && !dimensions_type !== "cm") {
        return res.status(400).json({ message: 'El dimensions_type debe ser m' });
    }

    //Validación weight_num
    if (isNaN(weight_num)) {
        return res.status(400).json({ message: 'El weight_num debe ser un número' });
    }
    if (weight_num<=0) {
        return res.status(400).json({ message: 'El weight_num debe ser un número positivo' });
    }

    //Validación weight_type
    if (weight_type !== "kg" && weight_type !== "g") {
        return res.status(400).json({ message: 'El weight_type debe ser kg o g' });
    }

    //Validación description
    if (!isNaN(description)) {
        return res.status(400).json({ message: 'El description debe ser una cadena de caracteres' });
    }

    //Validación productMarlk
    if (!isNaN(productMarlk)) {
        return res.status(400).json({ message: 'El productMarlk debe ser una cadena de caracteres' });
    }

    //Validación material
    if (!isNaN(material)) {
        return res.status(400).json({ message: 'El material debe ser una cadena de caracteres' });
    }

    // Validar que la foto esté en Base64
    const urlPattern = /^(https?:\/\/)[\w.-]+\.[a-z]{2,}([\/\w .-]*)*\/?$/i;
    if (!urlPattern.test(photo)) {
        return res.status(400).json({ message: "La foto debe ser una URL válida." });
    }

    try {
        const newProduct = await Product.create({
            name,
            price,
            dimensions_width, 
            dimensions_height, 
            dimensions_depth, 
            dimensions_type,
            weight_num, 
            weight_type,
            description,
            productMarlk,
            material,
            photo,
            status: true,
            creationDate: new Date(),
        });

        console.log(newProduct);

        return res.status(201).json({ message: "Producto registrado", data: newProduct });

    } catch (error) {
        console.error("Error al registrar producto:", error);
        return res.status(500).json({ message: "Error al registrar el producto" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, dimensions_width, dimensions_height, dimensions_depth, dimensions_type, weight_num, weight_type, description, productMarlk, material, photo } = req.body;

    // Validar que el producto exista
    const productExists = await Product.findByPk(id);
    if (!productExists) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Validación name (debe ser una cadena de caracteres)
    if (name !== undefined && name !== null) {
        if (!isNaN(name)) {
            return res.status(400).json({ message: 'El name debe ser una cadena de caracteres' });
        }
    }

    // Validación price (debe ser un número positivo)
    if (price !== undefined && price !== null) {
        if (isNaN(price)) {
            return res.status(400).json({ message: 'El price debe ser un número' });
        }
        if (price <= 0) {
            return res.status(400).json({ message: 'El price debe ser un número positivo' });
        }
    }

    // Validación dimensions_width (debe ser un número positivo)
    if (dimensions_width !== undefined && dimensions_width !== null) {
        if (isNaN(dimensions_width)) {
            return res.status(400).json({ message: 'El dimensions_width debe ser un número' });
        }
        if (dimensions_width <= 0) {
            return res.status(400).json({ message: 'El dimensions_width debe ser un número positivo' });
        }
    }

    // Validación dimensions_height (debe ser un número positivo)
    if (dimensions_height !== undefined && dimensions_height !== null) {
        if (isNaN(dimensions_height)) {
            return res.status(400).json({ message: 'El dimensions_height debe ser un número' });
        }
        if (dimensions_height <= 0) {
            return res.status(400).json({ message: 'El dimensions_height debe ser un número positivo' });
        }
    }

    // Validación dimensions_depth (debe ser un número positivo)
    if (dimensions_depth !== undefined && dimensions_depth !== null) {
        if (isNaN(dimensions_depth)) {
            return res.status(400).json({ message: 'El dimensions_depth debe ser un número' });
        }
        if (dimensions_depth <= 0) {
            return res.status(400).json({ message: 'El dimensions_depth debe ser un número positivo' });
        }
    }

    // Validación dimensions_type (debe ser "m" o "cm")
    if (dimensions_type !== undefined && dimensions_type !== null) {
        if (dimensions_type !== "m" && dimensions_type !== "cm") {
            return res.status(400).json({ message: 'El dimensions_type debe ser m o cm' });
        }
    }

    // Validación weight_num (debe ser un número positivo)
    if (weight_num !== undefined && weight_num !== null) {
        if (isNaN(weight_num)) {
            return res.status(400).json({ message: 'El weight_num debe ser un número' });
        }
        if (weight_num <= 0) {
            return res.status(400).json({ message: 'El weight_num debe ser un número positivo' });
        }
    }

    // Validación weight_type (debe ser "kg" o "g")
    if (weight_type !== undefined && weight_type !== null) {
        if (weight_type !== "kg" && weight_type !== "g") {
            return res.status(400).json({ message: 'El weight_type debe ser kg o g' });
        }
    }

    // Validación description (debe ser una cadena de caracteres)
    if (description !== undefined && description !== null) {
        if (!isNaN(description)) {
            return res.status(400).json({ message: 'El description debe ser una cadena de caracteres' });
        }
    }

    // Validación productMarlk (debe ser una cadena de caracteres)
    if (productMarlk !== undefined && productMarlk !== null) {
        if (!isNaN(productMarlk)) {
            return res.status(400).json({ message: 'El productMarlk debe ser una cadena de caracteres' });
        }
    }

    // Validación material (debe ser una cadena de caracteres)
    if (material !== undefined && material !== null) {
        if (!isNaN(material)) {
            return res.status(400).json({ message: 'El material debe ser una cadena de caracteres' });
        }
    }

    if (photo !== undefined && photo !== null) {
        const urlPattern = /^(https?:\/\/)[\w.-]+\.[a-z]{2,}([\/\w .-]*)*\/?$/i;
        if (!urlPattern.test(photo)) {
            return res.status(400).json({ message: "La foto debe ser una URL válida." });
        }
    }


    try {
        const updatedProduct = await productExists.update({
            name: name || productExists.name,
            price: price || productExists.price,
            dimensions_width: dimensions_width || productExists.dimensions_width, 
            dimensions_height: dimensions_height || productExists.dimensions_height, 
            dimensions_depth: dimensions_depth || productExists.dimensions_depth, 
            dimensions_type: dimensions_type || productExists.dimensions_type,
            weight_num: weight_num || productExists.weight_num, 
            weight_type: weight_type || productExists.weight_type,
            description: description || productExists.description,
            productMarlk: productMarlk || productExists.productMarlk,
            material: material || productExists.material,
            photo: photo || productExists.photo,
        });

        return res.status(200).json({ message: "Producto actualizado", data: updatedProduct });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return res.status(500).json({ message: "Error al actualizar el producto" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await product.update({
            status: false,
        });

        return res.status(200).json({ message: "Producto dado de baja"});
    } catch (error) {
        console.error("Error al dar de baja producto:", error);
        return res.status(500).json({ message: "Error al dar de baja el producto" });
    }
};