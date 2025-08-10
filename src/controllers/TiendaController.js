
import Tienda from '../models/Tienda.js';

// Listar tiendas
export const listStores = async (req, res) => {
  try {
    const usuario_id = req.userID;
    const tiendas = await Tienda.findAll({ where: { usuario_id, activa: true } });

    res.status(200).json({
      message: 'Tiendas obtenidas exitosamente',
      tiendas
    });
  } catch (error) {
    console.error('Error al listar tiendas:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

//seleccioanr la tienda activa
export const selectStore = async (req, res) => {
  try {
    const usuario_id = req.userID;
    const { id } = req.params;

    const tienda = await Tienda.findOne({ where: { id, usuario_id, activa: true } });
    if (!tienda) {
      return res.status(404).json({ message: 'Tienda no encontrada o no pertenece al usuario' });
    }

    req.session.store_id = tienda.id;

    res.status(200).json({
      message: 'Tienda seleccionada exitosamente',
      tienda
    });
  } catch (error) {
    console.error('Error al seleccionar tienda:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Registrar nueva tienda
export const registerStore = async (req, res) => {
  try {
    const usuario_id = req.userID;
    const data = req.body;

    // Validación rápida
    if (!data.nombre_tienda || !data.email_tienda) {
      return res.status(400).json({ message: 'Nombre y email son obligatorios' });
    }

    const nuevaTienda = await Tienda.create({
      usuario_id,
      nombre_tienda: data.nombre_tienda,
      descripcion: data.descripcion || '',
      direccion: data.direccion || '',
      zona_id: data.zona_id || null,
      telefono_tienda: data.telefono_tienda || '',
      email_tienda: data.email_tienda,
      horario_apertura: data.horario_apertura || '08:00:00',
      horario_cierre: data.horario_cierre || '18:00:00',
      dias_atencion: data.dias_atencion || '',
      activa: true
    });

    res.status(201).json({ message: 'Tienda creada exitosamente', tienda: nuevaTienda });
  } catch (error) {
    console.error('Error al registrar tienda:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Obtener detalles de la tienda activa
export const getStoreDetails = async (req, res) => {
  try {
    const usuario_id = req.userID;
    const store_id = req.session.store_id;

    if (!store_id) {
      return res.status(400).json({ message: 'No hay tienda activa seleccionada' });
    }

    const tienda = await Tienda.findOne({ where: { id: store_id, usuario_id, activa: true } });
    if (!tienda) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    res.status(200).json(tienda);
  } catch (error) {
    console.error('Error al obtener detalles de tienda:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Actualizar tienda activa
export const updateStore = async (req, res) => {
  try {
    const usuario_id = req.userID;
    const store_id = req.session.store_id;

    if (!store_id) {
      return res.status(400).json({ message: 'No hay tienda activa seleccionada' });
    }

    const tienda = await Tienda.findOne({ where: { id: store_id, usuario_id, activa: true } });
    if (!tienda) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    await tienda.update(req.body);

    res.status(200).json({ message: 'Tienda actualizada exitosamente', tienda });
  } catch (error) {
    console.error('Error al actualizar tienda:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Eliminar tienda (Soft Delete)
export const deleteStore = async (req, res) => {
  try {
    const usuario_id = req.userID;
    const { id } = req.params;

    const tienda = await Tienda.findOne({ where: { id, usuario_id } });
    if (!tienda) {
      return res.status(404).json({ message: 'Tienda no encontrada o no pertenece al usuario' });
    }

    // Borrado lógico
    await tienda.update({ activa: false });

    res.status(200).json({ message: 'Tienda eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar tienda:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
