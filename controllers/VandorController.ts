import express, { Request, Response, NextFunction } from 'express';
import { VandorLoginInputs,EditVendorInput } from '../dto'
import { Vandor } from '../models';
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from '../utility';
import { FindVandor } from './AdminController';

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VandorLoginInputs>req.body;
    const existingVandor = await FindVandor('', email)
    if (existingVandor != null) {

        const validation = await ValidatePassword(password,existingVandor.password,existingVandor.salt)
        if(validation){
            const signature = await GenerateSignature({
                _id: existingVandor.id,
                email: existingVandor.email,
                foodType : existingVandor.foodType,
                name: existingVandor.name
            })
            return res.json(signature)
        }
    }
    return res.json({ "message": "Login in Credential is not Valid" })

}

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
     
    if(user){

       const existingVendor = await FindVandor(user._id);
       return res.json(existingVendor);
    }

    return res.json({'message': 'vendor Information Not Found'})
}

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    const { foodType, name, address, phone} = <EditVendorInput>req.body;
     
    if(user){

       const existingVendor = await FindVandor(user._id);

       if(existingVendor !== null){

            existingVendor.name = name;
            existingVendor.address;
            existingVendor.phone = phone;
            existingVendor.foodType = foodType;
            const saveResult = await existingVendor.save();

            return res.json(saveResult);
       }

    }
    return res.json({'message': 'Unable to Update vendor profile '})
}

export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

     if(user){

       const existingVandor = await FindVandor(user._id);

       if(existingVandor !== null){
        existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
    
        const saveResult = await existingVandor.save();
        return res.json(saveResult);
       }

    }
    return res.json({'message': 'Unable to Update vendor profile '})
}
