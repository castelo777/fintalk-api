module.exports = app => {
    const controller = app.controllers.auth
        
    app.route('/sign_in')
        .post(controller.login)
}