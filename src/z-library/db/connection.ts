import mongoose from "mongoose"

export class Connection {

    private initialConnection: mongoose.Connection

    constructor(intialDbUri: string){
        this.initialConnection = mongoose.createConnection(intialDbUri)
        
        this.initialConnection.on('error', (error) => {
            if(error){
                throw new Error('Database connection failed')
            }
        })

        process.on('unhandledRejection', (reason: any, Promise) =>{
            throw new Error('Reason for failure - ', reason.message)
        })

        this.initialConnection.on('connected', () => {
            throw new Error('Application Connected to Database')
        })
    }

    public getInitial = (): mongoose.Connection =>{
        return this.initialConnection
    }

    public switch = (newdBName: string): mongoose.Connection =>{
        return this.initialConnection.useDb(newdBName)
    }
}