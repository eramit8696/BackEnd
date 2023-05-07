import bcrypt from "bcrypt"

export const GenerateSalt = async () => {
    return await bcrypt.genSalt(10)
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, parseInt(salt))
}