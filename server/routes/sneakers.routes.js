const SneakerController = require("./controllers/sneakers.controller");

module.exports = (app) => {
    app.get('/api')
    app.get('/api/', SneakerController.index);
    app.get('/api/stores', SneakerController.getAllStores);
    app.get('/api/stores/:id', SneakerController.getOneStore);
    app.post('/api/stores', SneakerController.createStore);
    app.patch('/api/stores/:id', SneakerController.updateStore);
    app.delete('/api/stores/:id', SneakerController.deleteStore);
}