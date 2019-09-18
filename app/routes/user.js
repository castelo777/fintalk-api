const checkAuth = require("../../config/checkAuht")
module.exports = app => {
    const controller = app.controllers.user

        
    app.route('/user')
        .get(checkAuth, controller.list)
        .post(checkAuth, controller.createOrUpdate)
        .put(checkAuth, controller.createOrUpdate)
    
    app.route('/user/:id')
        .get(checkAuth, controller.findById)
        .delete(checkAuth, controller.destroy)

}