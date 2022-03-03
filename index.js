const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema/typeDefs');
const resolvers = require('./src/schema/resolvers');
const models = require('./models');
const auth = require('./src/middleware/auth');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ auth }) => {
        return { auth, models };
    },
    cors: true,
}); 

server
    .listen()
    .then(({ url }) => console.log(`Server is running on ${url}`))
