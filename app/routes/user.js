module.exports = app => {
    const controller = app.controllers.user

        
    app.route('/user')
        .get(controller.list)
        .post(controller.createOrUpdate)
        .put(controller.createOrUpdate)
    
    app.route('/user/:id')
        .get(controller.findById)
        .delete(controller.destroy)

}