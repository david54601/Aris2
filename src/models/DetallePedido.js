import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const DetallePedido = sequelize.define('DetallePedido', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pedido_id: { type: DataTypes.INTEGER, allowNull: false },
  producto_id: { type: DataTypes.INTEGER, allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  precio_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
  tableName: 'detalles_pedido',
  timestamps: false
});

export default DetallePedido;
