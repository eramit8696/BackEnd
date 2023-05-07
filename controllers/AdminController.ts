import express, { Request, Response, NextFunction } from 'express';
import { CreateVandorInput } from '../dto'
import { Vandor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utility';

export const FindVandor = async (id: string | undefined, email?: string) => {

   if (email) {
        const vandor = await Vandor.findOne({ email: email })
        return vandor
    } else {
        const vandor = await Vandor.findById(id)
        return vandor
    }

}


export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {

    const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVandorInput>req.body;
    const existingVandor = await FindVandor('',email)
    if (existingVandor != null) {

        return res.json({ "message": "A Vandor exist with Same email Id " })
    }
    // Todo ; Generte Salt need to be done
    const salt = await GenerateSalt()
    console.log('Salt Value ' + salt);
    const userPassword = await GeneratePassword(salt, password)

    const createdVandor = await Vandor.create({
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

}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {
    const vandors = await Vandor.find()
    if (vandors != null) {
        return res.json(vandors)
    }
    return res.json({ "message": "No Vamdor Found" })
}


export const GetVandorsById = async (req: Request, res: Response, next: NextFunction) => {
    const vandorid = req.params.id
    const vandor = await FindVandor(vandorid)
    if (vandor != null) {
        return res.json(vandor)
    }
    return res.json({ "message": "No Vamdor Found" })
}


