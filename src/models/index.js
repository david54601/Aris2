import Usuario from './Usuario.js';
import Tienda from './Tienda.js';
import Producto from './Producto.js';
import Categoria from './Categoria.js';
import Pedido from './Pedido.js';
import DetallePedido from './DetallePedido.js';


Usuario.hasMany(Tienda, { foreignKey: 'usuario_id', as: 'tiendas' });
Tienda.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });


// TIENDA → PRODUCTOS

Tienda.hasMany(Producto, { foreignKey: 'tienda_id', as: 'productos' });
Producto.belongsTo(Tienda, { foreignKey: 'tienda_id', as: 'tienda' });

// CATEGORÍA → PRODUCTOS

Categoria.hasMany(Producto, { foreignKey: 'categoria_id', as: 'productos' });
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });


// USUARIO y TIENDA → PEDIDOS

Usuario.hasMany(Pedido, { foreignKey: 'usuario_id', as: 'pedidos' });
Tienda.hasMany(Pedido, { foreignKey: 'tienda_id', as: 'pedidos' });

Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Pedido.belongsTo(Tienda, { foreignKey: 'tienda_id', as: 'tienda' });


// PEDIDO → DETALLE_PEDIDO → PRODUCTO

Pedido.hasMany(DetallePedido, { foreignKey: 'pedido_id', as: 'detalles' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedido' });

Producto.hasMany(DetallePedido, { foreignKey: 'producto_id', as: 'detalles' });
DetallePedido.belongsTo(Producto, { foreignKey: 'producto_id', as: 'producto' });

export {
  Usuario,
  Tienda,
  Producto,
  Categoria,
  Pedido,
  DetallePedido
};
