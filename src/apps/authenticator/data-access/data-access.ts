import  { Connection, HydratedDocument } from "mongoose"

export class DataAccess{
    private authDbConnection: Connection

    constructor(authDbConnection: Connection){
        this.authDbConnection = authDbConnection
    }
    public findUserByEmail = async(email: string
        ): Promise<HydratedDocument<any> | null> =>{
       return await this.authDbConnection.db.collection('users').findOne({ email })
    }    
}
