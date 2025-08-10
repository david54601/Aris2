import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Producto = sequelize.define('Producto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tienda_id: { type: DataTypes.INTEGER, allowNull: false },
  categoria_id: { type: DataTypes.INTEGER, allowNull: false },
  nombre: { type: DataTypes.STRING(200), allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  precio_oferta: { type: DataTypes.DECIMAL(10, 2) },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  sku: { type: DataTypes.STRING(50) },
  peso: { type: DataTypes.DECIMAL(8, 2) },
  dimensiones: { type: DataTypes.STRING(50) },
  imagen_principal: { type: DataTypes.STRING(255) },
  estado_id: { type: DataTypes.INTEGER, defaultValue: 1 },
  destacado: { type: DataTypes.BOOLEAN, defaultValue: false },
  vistas: { type: DataTypes.INTEGER, defaultValue: 0 },
  ventas: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'productos',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
});

export default Producto;
