async function getVehicleStatus(){
    if(!vehicle.accessTokensReponse){
        return "pending and make the user to re-try
    }

    if(vehicle.accessTokensReponse.status === "pending"){
        return "pending and prompt user to check their emails"
    }

    if(vehicle.accessTokensReponse.status === "approved"){
        return "approved"
    }
}