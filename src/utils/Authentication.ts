import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Authentication {
    public static passwordHas = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10);
    }

    public static passwordCompare = async (text: string, encryptedTex: string): Promise<boolean> => {
        let result = await bcrypt.compare(text, encryptedTex);
        return result;
    }

    public static generateToken =  (id: number, username: string, password: string) => {
        const secretKey: string = process.env.JWT_SECRET_KEY || "secret";

        const token = jwt.sign({ id, username, password }, secretKey);
        return token;
    }
}

export default Authentication;