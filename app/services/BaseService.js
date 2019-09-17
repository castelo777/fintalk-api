class BaseService {

    constructor(){
        this.list = this.list.bind(this)
        this.findById = this.findById.bind(this)
        this.createOrUpdate = this.createOrUpdate.bind(this)
        this.destroy = this.destroy.bind(this)
    }

    static set model(model){
        this.model = model
    }

    static get model(){
        return model
    }

    static async list(query){
        
    }


    static async findById(id){

    }


    static async createOrUpdate(data){

    }

    static async destroy(id){

    }
}

module.exports = BaseService