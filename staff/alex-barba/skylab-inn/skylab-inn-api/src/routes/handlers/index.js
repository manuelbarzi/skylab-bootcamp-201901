module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    updateUser: require('./update-user'),

    searchSkylaber: require('./search-skylaber'),

    retrieveSkylaber: require('./retrieve-skylaber'),

    advancedSearchSkylaber: require('./advanced-search-skylaber'),

    addUserInformation: require('./add-user-information'),

    updateUserInformation: require('./update-user-information'),

    removeUserInformation: require('./remove-user-information'),

    registerAdmin: require('./register-admin'),

    addSkylaber: require('./add-skylaber'),

    retrievePendingSkylabers: require('./retrieve-pending-skylabers'),

    updateUserPhoto: require('./update-user-photo'),

    verifyEmail: require ('./verify-email')
}