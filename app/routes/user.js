module.exports = app => {
    const controller = app.controllers.user

    app.get('/', controller.list)
    app.route('/:id')
        .get(controller.findById)
        .delete(controller.destroy)
        
    app.route('/')
        .post(controller.createOrUpdate)
        .put(controller.createOrUpdate)
}