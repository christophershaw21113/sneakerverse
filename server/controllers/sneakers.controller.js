const SneakerFinder = require('../models/sneakers.model')

module.exports = {

    index: (req, res) => {
        res.json({ message: "This works!" })

    },
    createSneaker: async (req, res) => {
        console.log(req.body)
        try {
            const { name, brand, gender, price, discountedPrice, color, size, description } = req.body;
            const image = req.file.filename;

            const sneaker = new SneakerFinder({ name, brand, gender, price, discountedPrice, color, size, description, image });
            console.log(sneaker)
            await sneaker.save();

            res.status(201).json({ message: 'Sneaker uploaded successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong creating a sneaker', error: error });
        }
    },
    // saveSneaker: (req, res) => {
    //     SneakerFinder.save()
    //         .then(savedSneaker => {
    //             console.log('Sneaker saved:', savedSneaker);
    //         })
    //         .catch(err => {
    //             console.error('Error saving sneaker:', err);
    //         });
    // },

    getAllSneakers: (req, res) => {
        SneakerFinder.find({})
            .then(findSneaker => {
                res.json(findSneaker)
                // console.log(findSneaker)
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
    updateSneakerBody: async (req, res) => {
        console.log(req.body)
        try {
            console.log(req.body, "...", req.file)
            const { name, brand, gender, price, discountedPrice, color, size, description } = req.body

            const updatedSneaker = await SneakerFinder.findOneAndUpdate(
                { _id: req.params.id },
                { name, brand, gender, price, discountedPrice, color, size, description },
                { new: true }
            )

            res.status(201).json({ message: 'Sneaker body updated successfully!', sneaker: updatedSneaker })
            console.log("72", updatedSneaker)
        } catch (error) {
            console.log("74 Something went wrong updating a shoe body", error)
            res.status(500).json({ message: '75 Error updating sneaker body', error: error })
        }
    },
    updateSneakerImage: async (req, res) => {
        console.log(req.body)
        try {
            console.log(req.body, "...", req.file)
            const image = req.file ? req.file.filename : null

            const updatedSneaker = await SneakerFinder.findOneAndUpdate(
                { _id: req.params.id },
                { image },
                { new: true }
            )

            res.status(201).json({ message: 'Sneaker image updated successfully!', sneaker: updatedSneaker })
            console.log(updatedSneaker)
        } catch (error) {
            console.log("Something went wrong updating a shoe image", error)
            res.status(500).json({ message: 'Error updating sneaker image', error: error })
        }
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

// module.exports.addPicture = async (req, res) => {

//     try {
//         const id = req.params.id
//         const { Picture } = req.body
//         const sneaker = await SneakerFinder.findByIdAndUpdate(id, { Picture }, { new: true })
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Same as above 3 lines

//         if (!sneaker) {
//             return res.status(404).json({ error: 'Shoe not found' })
//         }

//         res.status(200).json(user)
//     } catch (error) {
//         console.log('Controller: error adding picture:', error)
//         res.status(500).json({ error: 'Controller: failed to add picture' })
//     }

// }
