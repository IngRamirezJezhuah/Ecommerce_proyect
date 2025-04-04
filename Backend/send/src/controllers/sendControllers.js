import Send from '../models/sendModel.js';

// Validar cadenas vacias
const isValidString = (value, maxLength = 255) => typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;


// Obtener todos los envíos
export const getSends = async (req, res) => {
    try {
        const sends = await Send.findAll();
        res.status(200).json(sends);
    } catch (error) {
        console.error('Error al obtener los envíos: ', error);
        res.status(500).json({ message: 'Error al obtener los envíos' });
    }
};

export const createSend = async (req, res) => {
    const { weight_num, weight_type, packageDimensions_width, packageDimensions_height, packageDimensions_depth, packageDimensions_type, destination, origin, address, costumerName, fragile, extraInformation } = req.body;
    
    //Validar que esten todos los campos
    const requiredFields = [
        'weight_num', 'weight_type', 'packageDimensions_width', 
        'packageDimensions_height', 'packageDimensions_depth', 
        'packageDimensions_type', 'destination', 'origin', 
        'address', 'costumerName', 'extraInformation'
    ];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Faltan los siguientes campos: ${missingFields.join(', ')}`
        });
    }
    
    // Validar weight_num (debe ser un número positivo)
    if (isNaN(weight_num)) {
        return res.status(400).json({ message: 'El weight_num debe ser un número' });
    }
    if (weight_num<=0) {
        return res.status(400).json({ message: 'El weight_num debe ser un número positivo' });
    }

    //Validar weight_type
    if (weight_type !== "kg" && weight_type !== "g") {
        return res.status(400).json({ message: 'El weight_type debe ser kg o g' });
    }

    // Validar packageDimensions_width (debe ser un número positivo)
    if (isNaN(packageDimensions_width)) {
        return res.status(400).json({ message: 'El packageDimensions_width debe ser un número' });
    }
    if (packageDimensions_width<=0) {
        return res.status(400).json({ message: 'El packageDimensions_width debe ser un número positivo' });
    }

    // Validar packageDimensions_height (debe ser un número positivo)
    if (isNaN(packageDimensions_height)) {
        return res.status(400).json({ message: 'El packageDimensions_height debe ser un número' });
    }
    if (packageDimensions_height<=0) {
        return res.status(400).json({ message: 'El packageDimensions_height debe ser un número positivo' });
    }

    // Validar packageDimensions_depth (debe ser un número positivo)
    if (isNaN(packageDimensions_depth)) {
        return res.status(400).json({ message: 'El packageDimensions_depth debe ser un número' });
    }
    if (packageDimensions_depth<=0) {
        return res.status(400).json({ message: 'El packageDimensions_depth debe ser un número positivo' });
    }

    //Validar packageDimensions_type
    if (packageDimensions_type !== "m" && !packageDimensions_type !== "cm") {
        return res.status(400).json({ message: 'El packageDimensions_type debe ser m' });
    }

    // Validar destination
    if (!isNaN(destination)) {
        return res.status(400).json({ message: 'El destination debe ser una cadena de caracteres' });
    }

    // Validar origin
    if (!isNaN(origin)) {
        return res.status(400).json({ message: 'El origin debe ser una cadena de caracteres' });
    }

    // Validar address
    if (!isNaN(address)) {
        return res.status(400).json({ message: 'El address debe ser una cadena de caracteres' });
    }

    // Validar costumerName
    if (!isNaN(costumerName)) {
        return res.status(400).json({ message: 'El costumerName debe ser una cadena de caracteres' });
    }

    // Validar extraInformation
    if (!isNaN(extraInformation)) {
        return res.status(400).json({ message: 'El extraInformation debe ser una cadena de caracteres' });
    }

    //Validar fragile
    if (req.body.fragile === undefined || req.body.fragile === null) {
        return res.status(400).json({
            message: "El campo 'fragile' es obligatorio"
        });
    }    
    if (typeof fragile !== "boolean") {
        return res.status(400).json({ message: 'El fragile debe ser un booleano' });
    }

    try {
        const newSend = await Send.create({
            weight_num,
            weight_type,
            packageDimensions_width, 
            packageDimensions_height, 
            packageDimensions_depth, 
            packageDimensions_type,
            destination,
            origin,
            address,
            fragile,
            status:true,
            costumerName,
            extraInformation,
            delivered: false,
            creationDate: new Date(),
        });

        return res.status(201).json({ message: 'Envío creado', data: newSend });
    } catch (error) {
        console.error('Error al crear el envío:', error);
        return res.status(500).json({ message: 'Error al crear el envío' });
    }
};

// Actualizar un envío
export const updateSend = async (req, res) => {
    const { id } = req.params;
    const { weight_num, weight_type, packageDimensions_width, packageDimensions_height, packageDimensions_depth, packageDimensions_type, destination, origin, address, costumerName, fragile, extraInformation } = req.body;

    
    try {
        const send = await Send.findByPk(id);
        if (!send) {
            return res.status(404).json({ message: 'Envío no encontrado' });
        }
        
        // Validar weight_num (debe ser un número positivo)
        if (weight_num !== undefined && weight_num !== null) {
            if (isNaN(weight_num)) {
                return res.status(400).json({ message: 'El weight_num debe ser un número' });
            }
            if (weight_num <= 0) {
                return res.status(400).json({ message: 'El weight_num debe ser un número positivo' });
            }
        }
    
        // Validar weight_type
        if (weight_type !== undefined && weight_type !== null) {
            if (weight_type !== "kg" && weight_type !== "g") {
                return res.status(400).json({ message: 'El weight_type debe ser kg o g' });
            }
        }
    
        // Validar packageDimensions_width (debe ser un número positivo)
        if (packageDimensions_width !== undefined && packageDimensions_width !== null) {
            if (isNaN(packageDimensions_width)) {
                return res.status(400).json({ message: 'El packageDimensions_width debe ser un número' });
            }
            if (packageDimensions_width <= 0) {
                return res.status(400).json({ message: 'El packageDimensions_width debe ser un número positivo' });
            }
        }
    
        // Validar packageDimensions_height (debe ser un número positivo)
        if (packageDimensions_height !== undefined && packageDimensions_height !== null) {
            if (isNaN(packageDimensions_height)) {
                return res.status(400).json({ message: 'El packageDimensions_height debe ser un número' });
            }
            if (packageDimensions_height <= 0) {
                return res.status(400).json({ message: 'El packageDimensions_height debe ser un número positivo' });
            }
        }
    
        // Validar packageDimensions_depth (debe ser un número positivo)
        if (packageDimensions_depth !== undefined && packageDimensions_depth !== null) {
            if (isNaN(packageDimensions_depth)) {
                return res.status(400).json({ message: 'El packageDimensions_depth debe ser un número' });
            }
            if (packageDimensions_depth <= 0) {
                return res.status(400).json({ message: 'El packageDimensions_depth debe ser un número positivo' });
            }
        }
    
        // Validar packageDimensions_type
        if (packageDimensions_type !== undefined && packageDimensions_type !== null) {
            if (packageDimensions_type !== "m" && packageDimensions_type !== "cm") {
                return res.status(400).json({ message: 'El packageDimensions_type debe ser m o cm' });
            }
        }
    
        // Validar destination
        if (destination !== undefined && destination !== null) {
            if (typeof destination !== "string") {
                return res.status(400).json({ message: 'El destination debe ser una cadena de caracteres' });
            }
        }
    
        // Validar origin
        if (origin !== undefined && origin !== null) {
            if (typeof origin !== "string") {
                return res.status(400).json({ message: 'El origin debe ser una cadena de caracteres' });
            }
        }
    
        // Validar address
        if (address !== undefined && address !== null) {
            if (typeof address !== "string") {
                return res.status(400).json({ message: 'El address debe ser una cadena de caracteres' });
            }
        }
    
        // Validar costumerName
        if (costumerName !== undefined && costumerName !== null) {
            if (typeof costumerName !== "string") {
                return res.status(400).json({ message: 'El costumerName debe ser una cadena de caracteres' });
            }
        }
    
        // Validar extraInformation
        if (extraInformation !== undefined && extraInformation !== null) {
            if (typeof extraInformation !== "string") {
                return res.status(400).json({ message: 'El extraInformation debe ser una cadena de caracteres' });
            }
        }
    
        // Validar fragile
        if (fragile !== undefined && fragile !== null) {
            if (typeof fragile !== "boolean") {
                return res.status(400).json({ message: 'El fragile debe ser un booleano' });
            }
        }
        
        await send.update({
            weight_num: weight_num || send.weight_num,
            weight_type: weight_type || send.weight_type,
            packageDimensions_width: packageDimensions_width || send.packageDimensions_width,
            packageDimensions_height: packageDimensions_height || send.packageDimensions_height,
            packageDimensions_depth: packageDimensions_depth || send.packageDimensions_depth,
            packageDimensions_type: packageDimensions_type || send.packageDimensions_type,
            destination: destination || send.destination,
            origin: origin || send.origin,
            address: address || send.address,
            costumerName: costumerName || send.costumerName,
            fragile: fragile || send.fragile,
            extraInformation: extraInformation || send.extraInformation
        });

        return res.status(201).json({ message: 'Envío actualizado', data: send });
    } catch (error) {
        console.error('Error al actualizar el envío:', error);
        return res.status(500).json({ message: 'Error al actualizar el envío' });
    }
};

export const deleteSend = async (req, res) => {
    const { id } = req.params;

    if (!id || !Number.isInteger(Number(id))) {
        return res.status(400).json({ message: 'ID inválido, debe ser un número entero' });
    }

    try {
        const send = await Send.findByPk(id);
        if (!send) {
            return res.status(404).json({ message: 'Envío no encontrado' });
        }

        await send.update({
            status: false
        });

        return res.status(201).json({ message: 'Envío dado de baja', data: send });
    } catch (error) {
        console.error('Error al dar de baja el envío:', error);
        return res.status(500).json({ message: 'Error al dar de baja el envío' });
    }
};

export const deliveredSend = async (req, res) => {
    const { id } = req.params;

    if (!id || !Number.isInteger(Number(id))) {
        return res.status(400).json({ message: 'ID inválido, debe ser un número entero' });
    }

    try {
        const send = await Send.findByPk(id);
        if (!send) {
            return res.status(404).json({ message: 'Envío no encontrado' });
        }

        await send.update({
            delivered: true,
            deliveryDate: new Date(),
        });

        return res.status(201).json({ message: 'Envío entregado', data: send });
    } catch (error) {
        console.error('Error al eliminar el envío:', error);
        return res.status(500).json({ message: 'Error al entregar el envío' });
    }
};