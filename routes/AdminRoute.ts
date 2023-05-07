import express, { Request, Response, NextFunction} from 'express';
import {CreateVandor , GetVandors, GetVandorsById} from '../controllers'


const router = express.Router();

router.post('/vandor', CreateVandor)

// router.get('/vandors', GetVandors)

// router.get('/vandors/:id', GetVandorsById)

// router.get('/', (req: Request,res: Response, next: NextFunction) =>{
//     res.json({message: "Hello from Admin Route"})
// })

export {router as AdminRoute}