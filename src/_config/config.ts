import { Connection } from "../z-library/db/connection"
import { USERSDB_URI as dbUri } from "../_environment"
import { secretOrKey } from "../_environment"
import { zero } from "../zero/zero"


zero.initializePayloadParsers()
zero.allowCrossOriginResourceSharing()
zero.setUpSecurityMiddleware()
zero.logRequestsandResponses()

let connection: Connection

try {
    
    if(dbUri){
        connection = new Connection(dbUri)
        
        const authDbConnection = connection.getInitial()
        
        if(secretOrKey){
            zero.setUpAuthenticator(secretOrKey, authDbConnection)
        } else {
           throw new Error('Authentication Secret Key is Undefined. '
                +'Please provide all of them in enviroment variables'
            )
        }
    }
     else {
        throw new Error('Database Connection String not Found')
    }
   
} catch (error: any) {
    console.log(error.message)
}

const PORT = Number(process.env.PORT) || 8000
zero.listenToRequests(PORT,'')

export { connection }

