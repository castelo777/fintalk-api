module.exports = app => {
    const controller = app.controllers.auth

    app.get('/', controller.list)
    app.route('/:id')
        .get(controller.findById)
        .delete(controller.destroy)
        
    app.route('/sign_in')
        .post(controller.login)
        .put(controller.createOrUpdate)
}