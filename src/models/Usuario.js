
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  apellido: { type: DataTypes.STRING(100), allowNull: false },
  telefono: { type: DataTypes.STRING(20) },
  fecha_nacimiento: { type: DataTypes.DATE },
  foto_perfil: { type: DataTypes.STRING(255) },
  tipo_usuario_id: { type: DataTypes.INTEGER, defaultValue: 1 }, // Ej: 1 = cliente, 2 = vendedor, 3 = admin
  estado_id: { type: DataTypes.INTEGER, defaultValue: 1 },
  fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  ultima_conexion: { type: DataTypes.DATE },
  terminos_aceptados: { type: DataTypes.BOOLEAN, defaultValue: false },
  verificado: { type: DataTypes.BOOLEAN, defaultValue: false },
  token_verificacion: { type: DataTypes.STRING(255) },
  fecha_verificacion: { type: DataTypes.DATE }
}, {
  tableName: 'usuarios',
  timestamps: false
});

export default Usuario;
