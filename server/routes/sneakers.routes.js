const SneakerController = require("../controllers/sneakers.controller");

module.exports = (app) => {
    app.get('/api/', SneakerController.index);
    app.get('/api/shoes', SneakerController.getAllSneakers);
    app.get('/api/shoes/:id', SneakerController.getOneSneaker);
    app.post('/api/shoes', SneakerController.createSneaker);
    app.patch('/api/shoes/:id', SneakerController.updateSneaker);
    app.delete('/api/shoes/:id', SneakerController.deleteSneaker);
}

