import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Pedido = sequelize.define('Pedido', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  tienda_id: { type: DataTypes.INTEGER, allowNull: false },
  estado: { type: DataTypes.STRING(50), defaultValue: 'pendiente' },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  fecha_pedido: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'pedidos',
  timestamps: false
});

export default Pedido;
