// utils/storeUtils.js
import Tienda from '../models/Tienda.js';


export const getUserStore = async (req) => {
  const usuario_id = req.userID;
  const store_id = req.session?.store_id;

  if (!store_id) {
    throw { status: 400, message: 'No hay tienda activa seleccionada' };
  }

  const tienda = await Tienda.findOne({ where: { id: store_id, usuario_id } });
  if (!tienda) {
    throw { status: 404, message: 'Tienda no encontrada' };
  }

  return tienda;
};
