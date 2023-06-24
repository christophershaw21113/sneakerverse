const SneakerFinder = require('../models/sneakers.model')

module.exports = {

    index: (req, res) => {
        res.json({ message: "This works!" })

    },
    createSneaker: (req, res) => {
        SneakerFinder.create(req.body)
          .then(createdSneaker => res.json(createdSneaker))
          .catch(err => res.json(err));
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
