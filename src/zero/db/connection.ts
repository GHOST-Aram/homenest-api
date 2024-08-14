import mongoose from "mongoose"

export default class ConnectionPool {

    private initialConnection: mongoose.Connection

    constructor(intialDbUri: string){
        this.initialConnection = mongoose.createConnection(intialDbUri)
        
        this.initialConnection.on('error', (error) => {
            if(error){
                console.warn('Database connection failed')
            }
        })

        process.on('unhandledRejection', (reason: any, Promise) =>{
            console.warn('Reason for failure - ', reason.message)
        })

        this.initialConnection.on('connected', () => {
            console.log('Application Connected to Database')
        })
    }

    public getInitialConnection = (): mongoose.Connection =>{
        return this.initialConnection
    }

    public switchConnection = (newdBName: string): mongoose.Connection =>{
        return this.initialConnection.useDb(newdBName)
    }
}