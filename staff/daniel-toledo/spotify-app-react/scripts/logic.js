const logic = {
    searchArtists(query, callback) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.searchArtists(query, callback)
    },

    retrieveAlbums(artistId, callback) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveAlbums(artistId, callback)
    },

    retrieveTracks(albumId, callback) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveTracks(albumId, callback)
    },

    retrieveSong(songId, callback) {
        if (typeof songId !== 'string') throw TypeError(`${songId} is not a string`)

        if (!songId.trim().length) throw Error('songId is empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        spotifyApi.retrieveSong(songId, callback)
    },

    login(email, password, callback) {

        if (typeof email !== 'string') throw TypeError(email + ' is not a string');

        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof password !== 'string') throw TypeError(password + ' is not a string');

        if (!password.trim().length) throw Error('password cannot be empty');

        var user = users.find(user => {
            return email === user.email
        })

        if (!user) throw Error('user ' + email + ' not found');

        if (user.password !== password) throw Error('wrong password');

        var loggedInUser = {
            name: user.name,
            surname: user.surname,
            email: user.email,
            favorite: user.favorite
        };

        callback(loggedInUser);
    },

    register: function (name, surname, email, password, passwordConfirm, callback) {

        if (typeof name !== 'string') throw TypeError(name + ' is not a string');

        if (!name.trim().length) throw Error('name cannot be empty');

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string');

        if (!surname.trim().length) throw Error('surname cannot be empty');

        if (typeof email !== 'string') throw TypeError(email + ' is not a string');

        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof password !== 'string') throw TypeError(password + ' is not a string');

        if (!password.trim().length) throw Error('password cannot be empty');

        if (typeof passwordConfirm !== 'string') throw TypeError(passwordConfirm + ' is not a string');

        if (!passwordConfirm.trim().length) throw Error('password confirmation cannot be empty');

        var user = users.find(function (user) {
            return user.email === email
        })

        if (user) throw Error (user + 'already exists')

        if (password !== passwordConfirm) throw Error ("passwords don't match")

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password,
            favorite: []
        })

        callback()
    },

    toggleFavorite(trackId, email, callback) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string');

        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof trackId !== 'string') throw TypeError(trackId + ' is not a string');

        if (!trackId.trim().length) throw Error('trackId cannot be empty');


        users.find(user => {
            if (email === user.email) {

                var index = user.favorite.indexOf(trackId)

                if (index === -1) user.favorite.push(trackId)
                else user.favorite.splice(index, 1)

                callback(user.favorite)
                console.log('favorites',user.name, user.favorite)

            }
        })
    },

    retrieveFavorite(trackId, email, callback) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string');

        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof trackId !== 'string') throw TypeError(trackId + ' is not a string');

        if (!trackId.trim().length) throw Error('trackId cannot be empty');

        var favorite

        users.find(user => {
            if (email === user.email) {

                var index = user.favorite.indexOf(trackId)

                if (index === -1) favorite=false
                else favorite=true

            }
        })

        callback(favorite)

    }

}