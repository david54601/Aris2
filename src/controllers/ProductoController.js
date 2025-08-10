import Producto from '../models/Producto.js';
import { getUserStore } from '../utils/getUserStore.js';
import { Op } from 'sequelize';

/**
 * Validar datos de producto
 */
const validateProductData = (data, isUpdate = false) => {
  const errors = [];

  if (!isUpdate) {
    if (!data.categoria_id) errors.push('La categoría es obligatoria');
    if (!data.nombre) errors.push('El nombre es obligatorio');
    if (data.precio == null || isNaN(data.precio)) errors.push('El precio es obligatorio y debe ser numérico');
  }

  if (data.precio && isNaN(data.precio)) errors.push('El precio debe ser numérico');
  if (data.precio_oferta && isNaN(data.precio_oferta)) errors.push('El precio de oferta debe ser numérico');
  if (data.stock && !Number.isInteger(data.stock)) errors.push('El stock debe ser un número entero');
  if (data.peso && isNaN(data.peso)) errors.push('El peso debe ser numérico');

  return errors;
};

/**
 * Crear producto
 */
export const createProduct = async (req, res) => {
  try {
    const tienda = await getUserStore(req);
    const data = req.body;

    const errors = validateProductData(data);
    if (errors.length > 0) return res.status(400).json({ success: false, errors });

    const nuevoProducto = await Producto.create({
      tienda_id: tienda.id,
      categoria_id: data.categoria_id,
      nombre: data.nombre,
      descripcion: data.descripcion || '',
      precio: data.precio,
      precio_oferta: data.precio_oferta,
      stock: data.stock || 0,
      sku: data.sku,
      peso: data.peso,
      dimensiones: data.dimensiones,
      imagen_principal: data.imagen_principal,
      imagenes: data.imagenes || [], // array opcional
      destacado: data.destacado || false,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: nuevoProducto
    });

  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Error del servidor' });
  }
};

/**
 * Obtener todos los productos de la tienda activa con filtros
 */
export const getMyProducts = async (req, res) => {
  try {
    const tienda = await getUserStore(req);
    let { page = 1, limit = 10, search, minPrice, maxPrice, categoria_id } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const where = { tienda_id: tienda.id };

    if (search) {
      where.nombre = { [Op.like]: `%${search}%` };
    }

    if (minPrice && maxPrice) {
      where.precio = { [Op.between]: [minPrice, maxPrice] };
    }

    if (categoria_id) {
      where.categoria_id = categoria_id;
    }

    const productos = await Producto.findAndCountAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      total: productos.count,
      pages: Math.ceil(productos.count / limit),
      data: productos.rows
    });
  } catch (error) {
    console.error('Error al listar productos:', error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Error del servidor' });
  }
};

/**
 * Obtener un producto por ID
 */
export const getProductById = async (req, res) => {
  try {
    const tienda = await getUserStore(req);
    const { id } = req.params;

    const producto = await Producto.findOne({ where: { id, tienda_id: tienda.id } });
    if (!producto) return res.status(404).json({ success: false, message: 'Producto no encontrado' });

    res.status(200).json({ success: true, data: producto });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Error del servidor' });
  }
};

/**
 * Actualizar producto
 */
export const updateProduct = async (req, res) => {
  try {
    const tienda = await getUserStore(req);
    const { id } = req.params;

    const producto = await Producto.findOne({ where: { id, tienda_id: tienda.id } });
    if (!producto) return res.status(404).json({ success: false, message: 'Producto no encontrado' });

    const data = req.body;
    const errors = validateProductData(data, true);
    if (errors.length > 0) return res.status(400).json({ success: false, errors });

    const allowedFields = [
      'categoria_id', 'nombre', 'descripcion', 'precio', 'precio_oferta',
      'stock', 'sku', 'peso', 'dimensiones', 'imagen_principal', 'imagenes', 'destacado'
    ];

    const updatedData = {};
    for (const key of allowedFields) {
      if (data[key] !== undefined) updatedData[key] = data[key];
    }
    updatedData.updated_by = req.user.id;

    await producto.update(updatedData);

    res.status(200).json({ success: true, message: 'Producto actualizado exitosamente', data: producto });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Error del servidor' });
  }
};

/**
 * Eliminar producto
 */
export const deleteProduct = async (req, res) => {
  try {
    const tienda = await getUserStore(req);
    const { id } = req.params;

    const producto = await Producto.findOne({ where: { id, tienda_id: tienda.id } });
    if (!producto) return res.status(404).json({ success: false, message: 'Producto no encontrado' });

    await producto.destroy();
    res.status(200).json({ success: true, message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Error del servidor' });
  }
};
