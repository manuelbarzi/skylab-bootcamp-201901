'use strict'

const logic = require('../../logic')
const { handleResponseError } = require('../route-helper')

module.exports = (req, res) => {
    const { userId, body: { identifier, brand, model } } = req

    try {
        logic.addDrone(userId, identifier, brand, model)
            .then(droneId => res.json({ droneId }))
            .catch(err => handleResponseError(err, res))
    } catch (error) {
        handleResponseError(error, res)
    }
}