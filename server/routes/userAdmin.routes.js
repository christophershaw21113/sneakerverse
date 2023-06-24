const UserController = require('../controllers/userAdmin.controller')

module.exports = app => {
    app.post('/api/users/register', UserController.register)
    app.post('/api/users/login', UserController.login)
    app.post('/api/users/logout', UserController.logout)
    app.get('/api/users', UserController.findAllUsers)
    app.get('/api/users/:id', UserController.findOneUser)
    app.patch('/api/users/:id/info', UserController.updateUserInfo)
    app.patch('/api/users/:id/password', UserController.updateUserPassword)
    app.patch('/api/users/:id/addProfilePicture', UserController.addProfilePicture)
    app.delete('/api/users/:id', UserController.deleteUser)
}