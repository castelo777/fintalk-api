const BaseService = require("./BaseService")


class UserService extends BaseService {

    static set model(model){
        this.model = model
    }

    

}

module.exports = UserService;