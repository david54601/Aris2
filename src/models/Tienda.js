import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Tienda = sequelize.define('Tienda', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  nombre_tienda: { type: DataTypes.STRING(150), allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  direccion: { type: DataTypes.STRING(255), allowNull: false },
  zona_id: { type: DataTypes.INTEGER, allowNull: false },
  telefono_tienda: { type: DataTypes.STRING(20) },
  email_tienda: { type: DataTypes.STRING(100) },
  logo: { type: DataTypes.STRING(255) },
  banner: { type: DataTypes.STRING(255) },
  horario_apertura: { type: DataTypes.TIME },
  horario_cierre: { type: DataTypes.TIME },
  dias_atencion: { type: DataTypes.STRING(20) },
  estado_id: { type: DataTypes.INTEGER, defaultValue: 3 },
  calificacion_promedio: { type: DataTypes.DECIMAL(2, 1), defaultValue: 0.0 },
  total_ventas: { type: DataTypes.INTEGER, defaultValue: 0 },
  comision_personalizada: { type: DataTypes.DECIMAL(5, 4), allowNull: true }
}, {
  tableName: 'tiendas',
  timestamps: false
});

export default Tienda;
