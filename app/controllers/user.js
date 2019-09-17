
class User {

    constructor(app){
        this.app = app;


    }

    async list (request, response) {

    }

    async findById ( request, response ) {

    }

    
    async createOrUpdate (request, response) {
        
    }
    
    async destroy(request, response) {

    }

}


module.exports = (app) => new User(app)