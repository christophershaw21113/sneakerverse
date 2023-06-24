const User = require("../models/userAdmin.model")
const jwt = require("jsonwebtoken")
const secret = process.env.FIRST_SECRET_KEY
const bcrypt = require('bcrypt')


module.exports = {
    register: async (req, res) => {
        try {
            const potentialUser = await User.findOne({ email: req.body.email })
            const potentialUser2 = await User.findOne({ firstName: req.body.firstName })
            if (potentialUser) {
                res.status(400).json({ emailMsg: "Email exists" })
            } else if (potentialUser2) {
                res.status(400).json({ firstNameMsg: "Display Name exists" })
            } else {
                const newUser = await User.create(req.body)
                const userToken = jwt.sign({ _id: newUser.id, email: newUser.email, firstName: newUser.firstName, lastName: newUser.lastName }, secret, { expiresIn: "1d" })
                res.cookie("userToken", userToken, { httpOnly: false }).json({ msg: "Create new userToken success!", user: newUser })
            }
        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }
    },
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                const passwordMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordMatch) {
                    const userToken = jwt.sign({ _id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }, secret, { expiresIn: "1d" })
                    res.cookie("userToken", userToken, { httpOnly: false }).json({ msg: "Login success!", user: user })
                } else {
                    res.status(400).json({ logErrMsg: "Invalid login attempt" })
                }
            } else {
                res.status(400).json({ logErrMsg: "Invalid login attempt" })
            }
        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }
    },
    logout: (req, res) => {
        res.clearCookie("userToken").json({ message: "Logout success!" })
    }
}


module.exports.findAllUsers = (req, res) => {
    User.find()
        .then(allUsers => res.json({ user: allUsers }))
        .catch(err => res.status(400).json({ message: "Something went worng finding all users", error: err }))
}
module.exports.findOneUser = (req, res) => {
    User.findById(req.params.id)
        .then(oneUser => res.json({ user: oneUser }))
        .catch(err => res.status(400).json({ message: "Something went worng finding a user", error: err }))
}
module.exports.updateUserInfo = (req, res) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token', err: err })
        }
        req.user = { _id: decoded._id }
    })
    const userId = req.params.id
    const loggedInUserId = req.user._id
    if (userId !== loggedInUserId) {
        return res.status(403).json({ message: 'Unauthorized access' })
    }
    User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedUser => {
            const userToken = jwt.sign({ _id: updatedUser.id, email: updatedUser.email, firstName: updatedUser.firstName}, secret, { expiresIn: "1d" })
            res.clearCookie("userToken")
            res.cookie("userToken", userToken, { httpOnly: false })
            res.json({ msg: "Delete & rewrite cookie success!", user: updatedUser })
        })
        .catch(err => res.status(400).json({ message: "Something went worng updating a user", error: err }))
}
module.exports.updateUserPassword = async (req, res) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token', err: err })
        }
        req.user = { _id: decoded._id }
    })

    const userId = req.params.id
    const loggedInUserId = req.user._id
    if (userId !== loggedInUserId) {
        return res.status(403).json({ message: 'Unauthorized access' })
    }

    try {
        const { password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { password: hashedPassword } },
            { new: true, runValidators: true }
        )
        res.json({ msg: "Password updated!", user: updatedUser })

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json({ user: updatedUser })
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong updating a user', error: error })
    }
}

module.exports.addProfilePicture = async (req, res) => {
    const token = req.headers.authorization
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token', err: err })
        }
        console.log("decoded", decoded)
        req.user = { _id: decoded._id }
    })
    const userId = req.params.id
    const loggedInUserId = req.user._id
    if (userId !== loggedInUserId) {
        return res.status(403).json({ message: 'Unauthorized access' })
    }
    try {
        const id = req.params.id
        const { profilePicture } = req.body
        const user = await User.findByIdAndUpdate(id, { profilePicture }, { new: true })
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Same as above 3 lines

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(user)
    } catch (error) {
        console.log('Controller: error adding profile picture:', error)
        res.status(500).json({ error: 'Controller: failed to add profile picture' })
    }

}
module.exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(result => res.json({ result: result }))
        .catch(err => res.status(400).json({ message: "Something went wrong deleting a user", error: err }))
}