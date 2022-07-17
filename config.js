import dotenv from 'dotenv'
dotenv.config()
export default {
    endpoint: process.env.mongodb_url
}