import bcrypt from "bcrypt"
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';
import { VandorPayload } from '../dto';
import { AuthPayload } from '../dto/Auth.dto';
import express from 'express';


export const GenerateSaltOld = async () => {
    return await bcrypt.genSalt()
}

export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await GeneratePassword(enteredPassword, salt) === savedPassword
}

export const GenerateSignature = async (payload: AuthPayload) => {

    return jwt.sign(payload, APP_SECRET, { expiresIn: '1d'});
 
 }
 
export const ValidateSignature  = async(req: Request) => {

    const signature = req.get('Authorization');

    if(signature){
        try {
            const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload;
            //https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript 
            req.user = payload;
            return true;

        } catch(err){
            return false
        } 
    }
    return false
};