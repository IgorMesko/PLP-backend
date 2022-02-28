const { ApolloServer } = require('apollo-server');
const db = require('./src/db/db.config');
const typeDefs = require('./src/schema/typeDefs');
const resolvers = require('./src/schema/resolvers');
const models = require('./models');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { models },
    cors: true,
}) 

server
    .listen()
    .then(({ url }) => console.log(`Server is running on ${url}`))

db.authenticate()
    .then(() => console.log('DB connected!'))
    .catch((err) => console.log('error -> ', err));