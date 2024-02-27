import bcrypt from "bcrypt"

export function hashPass(password: string) {
    return bcrypt.hashSync(password, 7)
}

export async function comparePass(password: string ,hashPassword: string) {
    return bcrypt.compare(password, hashPassword)
}