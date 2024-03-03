import { NextFunction, Request, Response } from "express";
import { Authenticatable } from "../../../../z-library/auth/auth";

class Authenticator implements Authenticatable{

    public authenticate = () =>{
    
        return (req: Request, res: Response, next: NextFunction) =>{
            const id = req.params.id

            const user = {
                "first_name": "Does",
                "last_name": "John",
                "email": "johndoe@gmail.com",
                "password": "$2b$10$zeG83Ol2WQPHwHSsn3dj2u0iyrS7pP//GjKJHGbs2nsJ7UoBPpH8G",
                "isAdmin": true,
                 "_id": id ? id: "64c9e4f2df7cc072af2ac8a4",
                "__v": 0    
            }
            req.user = user
            req.isAuthenticated = () =>Boolean(req.user)
            next()
        }
    } 
    
    public allowAdminUser = (req: Request, res: Response, next: NextFunction) => {
        const user: any = req.user
        if(user.isAdmin){
            next()
        }
        else{
            res.status(403).json({ message: "Forbidden" })
        }
    }
}


export const authenticator = new Authenticator()