
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//regitro usuario
export const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, password } = req.body;

    if (!nombre || !apellido || !email || !telefono || !password) {
      return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      email,
      telefono,
      password_hash: hashedPassword,
      tipo_usuario_id: 1,     // Usuario normal
      estado_id: 1,           // Activo
      terminos_aceptados: true,
      verificado: false
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email
      }
    });
  } catch (error) {
    console.error("Error en registerUser:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

//iniciar sesion
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Error de configuración del servidor" });
    }

    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "El usuario no existe." });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

// ------------------- OBTENER DETALLES -------------------
export const getUserDetails = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.userID, {
      attributes: { exclude: ["password_hash", "token_verificacion"] }
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error en getUserDetails:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

// ------------------- ACTUALIZAR USUARIO -------------------
export const updateUser = async (req, res) => {
  try {
    const { nombre, apellido, telefono, password } = req.body;

    if (!nombre && !apellido && !telefono && !password) {
      return res.status(400).json({ message: "No hay datos para actualizar." });
    }

    const user = await Usuario.findByPk(req.userID);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    let hashedPassword = user.password_hash;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      nombre: nombre || user.nombre,
      apellido: apellido || user.apellido,
      telefono: telefono || user.telefono,
      password_hash: hashedPassword
    });

    res.status(200).json({
      message: "Usuario actualizado correctamente",
      usuario: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error en updateUser:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

// ------------------- LOGOUT -------------------
export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      expires: new Date(0)
    });

    res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("Error en logout:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};
