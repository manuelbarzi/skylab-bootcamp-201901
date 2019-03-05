'user strict'

import finalApi from '../api'

const logic = {
    __userId__: null,
    __userApiToken__: null,

    async registerUser(name, surname, email, password, passwordConfirmation) {

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        try {
            const answer = await finalApi.registerUser(name, surname, email, password, passwordConfirmation)
            console.log(answer)
        } catch (error) {
            console.log(error)
        }
    },

    logInUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return finalApi.authenticateUser(email, password)
            .then(token => this.__userApiToken__ = token)
    },


    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },


    logOutUser() {
        this.__userApiToken__ = null
    },

    retrieveUser() {
        return finalApi.retrieveUser(this.__userApiToken__)
            .then(({ id, name, surname, email, favoriteArtists = [], favoriteAlbums = [], favoriteTracks = [] }) => ({
                id,
                name,
                surname,
                email,
                favoriteArtists,
                favoriteAlbums,
                favoriteTracks
            }))
    },





}

export default logic





// const logic = {
//     __userId__: null,
//     __userApiToken__: null,

//     registerUser(name, surname, email, password, passwordConfirmation) {
//         if (typeof name !== 'string') throw TypeError(name + ' is not a string')

//               return finalApi.registerUser(name, surname, email, password, passwordConfirmation)
//             .then(() => { })
//     }

// }

// export default logic