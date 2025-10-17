import { compare, hash } from 'bcryptjs';

export async function hashPassword(password) {
  return await hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return await compare(password, hashedPassword);
}

export function validateEmail(email) {
  return /[\s@]+@[\s@]+\.[\s@]+$/.test(email);
}

export function validatePassword(password) {
  return password.length >= 6;
}

export function validateUsername(username) {
  return /[a-zA-Z0-9_]{3,20}$/.test(username);
}
