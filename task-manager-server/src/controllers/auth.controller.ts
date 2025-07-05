import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user.model";
import { users } from "../data/user"; // Simulación de base de datos
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "clave-secreta"; // Reemplazar con una variable de entorno en producción

export const register = async (req: Request, res: Response) => {
  const { name, lastName, email, password } = req.body;

  if (!email || !password || !name || !lastName) {
    res.status(400).json({ message: "All the fields must been filled" });
    return;
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    res.status(400).json({ message: "User already taken" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: uuidv4(),
    name,
    lastName,
    email,
    password: hashedPassword,
  };
  users.push(newUser);
  res.status(201).json({ message: "Succesfull registration" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    },
  });
};

// Simulación de base de datos de usuarios
// const users = [
//     { id: 1, username: 'admin', password: 'password' }
// ];

// const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

// export const login = (req: Request, res: Response) => {
//     const { username, password } = req.body;
//     const user = users.find(u => u.username === username && u.password === password);

//     if (!user) {
//         return res.status(401).json({ message: 'Credenciales inválidas' });
//     }

//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
// };

// export const register = (req: Request, res: Response) => {
//     const { username, password } = req.body;
//     if (users.find(u => u.username === username)) {
//         return res.status(400).json({ message: 'El usuario ya existe' });
//     }
//     const newUser = { id: users.length + 1, username, password };
//     users.push(newUser);
//     res.status(201).json({ message: 'Usuario registrado' });
// };
