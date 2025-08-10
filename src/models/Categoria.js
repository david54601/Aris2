import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Categoria = sequelize.define('Categoria', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(150), allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  imagen: { type: DataTypes.STRING(255) },
  estado_id: { type: DataTypes.INTEGER, defaultValue: 1 }
}, {
  tableName: 'categorias',
  timestamps: false
});

export default Categoria;
