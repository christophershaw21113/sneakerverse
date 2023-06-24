const SneakerFinder = require('../models/sneakers.model')

module.exports = {

    index: (req, res) => {
        res.json({ message: "This works!" })

    },
    // createSneaker: (req, res) => {
    //     SneakerFinder.create(req.body)
    //         .then(createdSneaker => res.json(createdSneaker))
    //         .catch(err => res.json(err));
    // },
    createSneaker: (req, res) => {
        const newSneaker = new SneakerFinder({
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price,
            discountedPrice: req.body.discountedPrice,
            image: req.file.image,
            color: req.body.color,
            size: req.body.size,
            description: req.body.description
        })

        newSneaker.save()
        .then(()=> res.json("New sneaker added!"))
        .catch((err)=> res.status(400).json("controller error", err))
    },
    saveSneaker: (req, res) => {
        SneakerFinder.save()
            .then(savedSneaker => {
                console.log('Sneaker saved:', savedSneaker);
            })
            .catch(err => {
                console.error('Error saving sneaker:', err);
            });
    },

    getAllSneakers: (req, res) => {
        SneakerFinder.find({})
            .then(findSneaker => {
                res.json(findSneaker)
                console.log(findSneaker)
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            })

    },

    getOneSneaker: (req, res) => {
        SneakerFinder.findOne({ _id: req.params.id })
            .then(findOneSneakerOnly => {
                res.json(findOneSneakerOnly)
                console.log(findOneSneakerOnly)
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            })

    },

    updateSneaker: (req, res) => {
        SneakerFinder.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(updatedSneaker => {
                res.json(updatedSneaker)
                console.log(updatedSneaker)
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            })

    },

    deleteSneaker: (req, res) => {
        SneakerFinder.deleteOne({ _id: req.params.id })
            .then(deletedSneaker => {
                res.json(deletedSneaker)
                console.log(deletedSneaker)
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            })

    }
}

module.exports.addPicture = async (req, res) => {
    
    try {
        const id = req.params.id
        const { Picture } = req.body
        const sneaker = await SneakerFinder.findByIdAndUpdate(id, { Picture }, { new: true })
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Same as above 3 lines

        if (!sneaker) {
            return res.status(404).json({ error: 'Shoe not found' })
        }

        res.status(200).json(user)
    } catch (error) {
        console.log('Controller: error adding picture:', error)
        res.status(500).json({ error: 'Controller: failed to add picture' })
    }

}
