module.exports = app => {
    const controller = app.controllers.auth
        
    app.post('/sign_in', controller.login)
    app.post('/sign_up', controller.register)
}