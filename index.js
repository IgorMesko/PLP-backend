const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema/typeDefs');
const resolvers = require('./src/schema/resolvers');
const models = require('./models');
const auth = require('./src/middleware/auth');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const tokenBearer = req.headers.authorization || '';
        const token = tokenBearer.split(' ')[1];
        const user = auth(token);
        return { user, models };
    },
    cors: true,
}); 

server
    .listen()
    .then(({ url }) => console.log(`Server is running on ${url}`))
