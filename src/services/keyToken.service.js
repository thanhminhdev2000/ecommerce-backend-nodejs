'use strict'

const keystoreModel = require('../models/keystore.model')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const tokens = await keystoreModel.create({
                user: userId,
                publicKey,
                privateKey,
            })

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }
}

module.exports = KeyTokenService
