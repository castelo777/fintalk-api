
module.exports = (app) => {
    const model = app.models.user

    return {
        list : async  (request, response) => {
            const query = request.query;

            try {
                const data = await model.find(query, {password: false})            
    
                if(data)return response.status(200).json({status: 200, data})
                else return response.status(500).json({status: 500, message: `Can't list data please try again`})
            } catch (error) {
                console.log(error)
                return response.status(500).json({status: 500, message: `Unexpected erro accurent please try again later.`})
            }
          
        },
        findById:  async   ( request, response ) => {
           try {
                const _id = request.params.id;
                const data = await model.findById(_id, {password: false})

                if(data)return response.status(200).json({status: 200, data})
                else return response.status(500).json({status: 500, message: `Can't find data by id ${_id}`})

           } catch (error) {
                console.log(error)
                return response.status(500).json({status: 500, message: `Unexpected erro accurent please try again later.`})
           }
        },
    
        createOrUpdate:  async  (request, response) => {
            try {
                const body = request.body
                let data = null
                const user = await model.findOne({email: body.email})
                    
                if(!body.id && body.email && body.email !== user.email){
                    if(user)return response.status(500).json({status: 500, message: 'Email Address Exists in Database.'})
                }
                
                if(body.id) data = await model.findOneAndUpdate({_id: body._id || body.id}, body, {new: true})
                else data = await model.create(body)

                if(data)return response.status(200).json({status: 200, data})
                else return response.status(500).json({status: 500, message: 'Error on creteOrUpdate user.'})

            } catch (error) {
                console.log(error)
                return response.status(500).json({status: 500, message: `Unexpected erro accurent please try again later.`})
            }
        },
        destroy:  async  (request, response) => {
            try {
                const _id = request.params.id;
                const data = await model.findByIdAndRemove(_id)

                if(data)return response.status(200).json({status: 200, data: `Data destroy by id ${_id}`})
                else return response.status(500).json({status: 500, message: `Can't destroy data by id ${_id}`})
            } catch (error) {
                console.log(error)
                return response.status(500).json({status: 500, message: `Unexpected erro accurent please try again later.`})
            }
        }
    }
}