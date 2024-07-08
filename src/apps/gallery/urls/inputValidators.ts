import { NextFunction, Response, Request } from "express";

export const validateFiles =  (req: Request, res: Response, next: NextFunction) => {
    const files = req.files

    //Make sure the files array contains atleast one file
    if (!files) {
        return res.status(400).json({
            errors: ['File is required.'], 
            message: 'invalid input'
        });
    } 

    if (Array.isArray(files)){
        //Ensure each item in the files array is a file
        files.forEach(file =>{

            const filetypes = /jpeg|jpg|png|jfif|avif/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(file.originalname.split('.').pop() as string);
        
            if (!mimetype || !extname || !file.buffer) {
              return res.status(400).json(
                { 
                    errors: ['Invalid file type. Only JPEG and PNG are allowed.'],
                    message: 'Inavalid input'
                });
            }
        })
    }

    
    next();
}