const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('./auth')

const { env: { JWT_SECRET } } = process

const jsonParser = bodyParser.json()

const router = express.Router()

router.post('/user/register', jsonParser, (req, res) => {

    const { body: { name, surname, email, password } } = req

    handleErrors(async () => {
        await logic.registerUser(name, surname, email, password)
        res.status(201).json({ message: 'Ok, user registered.' })
    }, res)

})

router.post('/user/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    handleErrors(async () => {
        let sub = await logic.authenticateUser(email, password)
        const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '10h' })
        res.json({ token })
    }, res)
})

router.get('/user/retrieve', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        let user = await logic.retrieveUser(userId)
        res.json(user)
    }, res)
})

router.put('/user/update', auth, jsonParser, (req, res) => {

    handleErrors(async () => {
        const { userId, body } = req

        let user = await logic.updateUser(userId, body)
        res.json(user)
    }, res)
})

router.delete('/user/delete', auth, (req, res) => {

    handleErrors(async () => {
        const { userId } = req

        let user = await logic.deleteUser(userId)
        res.json(user)
    }, res)
})


router.get('/tickets', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        let user = await logic.listPrivateTickets(userId)
        res.json(user)
    }, res)
})

router.put('/ticket/addTicket', auth, jsonParser, (req, res) => {

    handleErrors(async () => {
        const { userId, body } = req

        let user = await logic.addPrivateTicket(userId, body)
        res.json(user)
    }, res)
})

router.get('/ticket/retrieve/:ticketId', auth, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { ticketId } } = req
        let user = await logic.retrivePrivateTicket(userId, ticketId)
        res.json(user)
    }, res)
})


router.post('/ticket/retrieve-dates', auth, jsonParser, (req, res) => {
    handleErrors(async () => {

        const { userId, body: { data } } = req

        let user = await logic.retrivePrivateTicketsByDates(userId, data)
        res.json(user)
    }, res)
})


router.put('/ticket/update/:ticketId', auth, jsonParser, (req, res) => {
    handleErrors(async () => {
        const { userId, params: { ticketId }, body: { data, position } } = req

        let user = await logic.updatePrivateTicket(userId, ticketId, data, position)
        res.json(user)
    }, res)
})



router.delete('/ticket/delete/:ticketId', auth, (req, res) => {

    handleErrors(async () => {
        const { userId, params: { ticketId } } = req

        let user = await logic.removePrivateTicket(userId, ticketId)
        res.json(user)
    }, res)
})

router.delete('/ticket/delete', auth, (req, res) => {

    handleErrors(async () => {
        const { userId } = req

        let user = await logic.removeAllPrivateTickets(userId)
        res.json(user)
    }, res)
})






module.exports = router