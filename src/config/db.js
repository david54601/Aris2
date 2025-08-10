import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_URI, {
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL conectado correctamente.');
  } catch (error) {
    console.error('❌ Error al conectar a MySQL:', error);
  }
};

export default connectDB; // 👈 Este export default sí permite hacer "import connectDB"
export { sequelize };
