import express, { Request, Response, NextFunction} from 'express';
import { CreateVandorInput} from '../dto'
import { Vandor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utility';

export const CreateVandor = async (req: Request,res: Response, next: NextFunction) =>{

    const { name, address, pincode, foodType, email, password, ownerName, phone }  = <CreateVandorInput>req.body;
    const existingVandor = await Vandor.findOne({email :email})
    if(existingVandor != null){

        return res.json({"message" : "A Vandor exist with Same email Id "})
    }
    // Todo ; Generte Salt need to be done
    const salt = await GenerateSalt()
    console.log('Salt Value '+ salt);
    const userPassword = await GeneratePassword(salt,password)

    const createdVandor =  await Vandor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: userPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
    })

    return res.json(createdVandor)
    //return res.json({name, address, pincode, foodType, email, password, ownerName, phone})
    
}

export const GetVandors = async (req: Request,res: Response, next: NextFunction) =>{
    
}
    
export const GetVandorsById  = async (req: Request,res: Response, next: NextFunction) =>{
    
}
    
    
