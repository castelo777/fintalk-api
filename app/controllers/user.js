
module.exports = (app) => {
    const model = app.models.user

    return {
        list : async  (request, response) => {
            const query = request.query;

            const data = await model.find()

            if(data)return response.status(200).json({status: 200, data})
            else return response.status(500).json({status: 500, message: `Can't list data please try again`})
        },
        findById:  async   ( request, response ) => {
            const _id = request.params.id;
            const data = await model.findById(_id)

            if(data)return response.status(200).json({status: 200, data})
            else return response.status(500).json({status: 500, message: `Can't find data by id ${_id}`})

        },
    
        createOrUpdate:  async  (request, response) => {
            const body = request.body
            let data = null

            if(body.id) data = await model.findOneAndUpdate({id: body.id}, body)
            else data = await model.create(body)

            if(data)return response.status(200).json({status: 200, data})
            else return response.status(500).json({status: 500, message: 'Error on creteOrUpdate user.'})
        },
        destroy:  async  (request, response) => {
            const _id = request.params.id;
            const data = await model.findByIdAndRemove(_id)

            if(data)return response.status(200).json({status: 200, data: `Data destroy by id ${_id}`})
            else return response.status(500).json({status: 500, message: `Can't destroy data by id ${_id}`})
        }
    }
}