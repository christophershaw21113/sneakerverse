const uploadMiddleware = require('../middleware/multerMiddleware')
const SneakerController = require("../controllers/sneakers.controller");

module.exports = (app) => {
    app.get('/api/', SneakerController.index);
    app.get('/api/shoes', SneakerController.getAllSneakers);
    app.get('/api/shoes/:id', SneakerController.getOneSneaker);
    app.post('/api/shoes', uploadMiddleware.single('image'), SneakerController.createSneaker);
    app.put('/api/shoes/:id', SneakerController.updateSneakerBody);
    app.put('/api/shoes/:id/image', uploadMiddleware.single('image'), SneakerController.updateSneakerImage);
    // app.patch('/api/shoes/addPicture', SneakerController.addPicture);
    app.delete('/api/shoes/:id', SneakerController.deleteSneaker);
}

