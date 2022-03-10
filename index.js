const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema/typeDefs');
const resolvers = require('./src/schema/resolvers');
const models = require('./models');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: true,
    context: (req) => ({
        req,
        models,
    }),
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});