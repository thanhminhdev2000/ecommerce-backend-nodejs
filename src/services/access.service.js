'use strict'

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils')

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class AccessService {
    static signUp = async ({ name, email, password, roles }) => {
        try {
            // check email exists
            const hoderShop = await shopModel.findOne({ email }).lean()
            if (hoderShop) {
                return {
                    code: 'xxxx',
                    message: 'Shop already registered!',
                }
            }

            const passwordHash = await bcrypt.hash(password, 10)

            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash,
                roles: [RoleShop.SHOP],
            })

            if (newShop) {
                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')

                console.log({ privateKey, publicKey }) // save collection KeyStore

                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey,
                })

                if (!keyStore) {
                    return {
                        code: 'xxxx',
                        message: 'keyStore error',
                    }
                }

                // create token pair
                const tokens = await createTokenPair(
                    { userId: newShop._id, email },
                    publicKey,
                    privateKey,
                )

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({
                            fields: ['_id', 'name', 'email'],
                            object: newShop,
                        }),
                        tokens,
                    },
                }
            }

            return {
                code: 200,
                metadata: null,
            }
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error',
            }
        }
    }
}

module.exports = AccessService
