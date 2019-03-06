'use strict'

import { type } from "os";
import { REPL_MODE_SLOPPY } from "repl";

const arshopApi = {
    url: 'http://localhost:8000/api',

    registerUser(name, surname, email, password, passwordConfirm) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name is empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw Error('surname is empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(`${passwordConfirm} is not a string`)
        if (!passwordConfirm.trim().length) throw Error('password confirm is empty')
        
        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(({ id, error }) => {
                console.log(id, error)
                if (error) throw Error(error)

                return id
            })
    },

    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response.token
            })
    },

    retrieveUser(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/user`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    updateUser(token, data){
        if(typeof token !== 'string')throw TypeError(`${token} is not a string`)
        if(!token.trim().length)throw Error('token is empty')

        if(data.constructor !== Object)throw TypeError(`${data} is not an object`)

        return fetch(`${this.url}/user/update`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                if(response.error)throw Error(response.error)

                return response
            })
    },

    addProduct(token, product){
        if(typeof token !== 'string')throw TypeError(`${token} is not a string`)
        if(!token.trim().length)throw Error('token is empty')

        if(!product)throw Error('product should be defined')
        if(product.constructor !== Object)throw TypeError(`${product} is not an object`)

        return fetch(`${this.url}/add/product`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(product) 
        })
            .then(response => response.json())
            .then(response => {
                if(response.error)throw Error(response.error)

                return response
            })
    }
}

export default arshopApi