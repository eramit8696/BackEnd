import express, { Request, Response, NextFunction } from 'express';
import { VandorLoginInputs } from '../dto'
import { Vandor } from '../models';
import { GeneratePassword, GenerateSalt, ValidatePassword } from '../utility';
import { FindVandor } from './AdminController';

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VandorLoginInputs>req.body;
    const existingVandor = await FindVandor('', email)
    if (existingVandor != null) {

        const validation = await ValidatePassword(password,existingVandor.password,existingVandor.salt)
        if(validation){
            return res.json(existingVandor)
        }else{
            return res.json({ "message": "Password is not Valid" })
        }
    }
    return res.json({ "message": "Login in Credential is not Valid" })

}


