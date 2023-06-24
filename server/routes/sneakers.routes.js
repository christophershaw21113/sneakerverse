const uploadMiddleware = require('../middleware/multerMiddleware')

const SneakerController = require("../controllers/sneakers.controller");

module.exports = (app) => {
    app.get('/api/', SneakerController.index);
    app.get('/api/shoes', SneakerController.getAllSneakers);
    app.get('/api/shoes/:id', SneakerController.getOneSneaker);
    app.post('/api/shoes', uploadMiddleware.single('image'), SneakerController.createSneaker);
    app.patch('/api/shoes/:id', SneakerController.updateSneaker);
    app.patch('/api/shoes/addPicture', SneakerController.addPicture)
    app.delete('/api/shoes/:id', SneakerController.deleteSneaker);

    app.get('/api/getSneakerImage', SneakerController.getSneakerImage)
}

