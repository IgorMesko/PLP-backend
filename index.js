const { ApolloServer } = require('apollo-server');
const db = require('./src/db/db.config');
const typeDefs = require('./src/schema/typeDefs');
const resolvers = require('./src/schema/resolvers');
const models = require('./models');
const auth = require('./src/middleware/auth');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const authHeaders = req.headers.authorization;
        const token = authHeaders && authHeaders.split(' ')[1];
        const access = auth(token);
        return { access, models };
    },
    cors: true,
}); 

server
    .listen()
    .then(({ url }) => console.log(`Server is running on ${url}`))

db.authenticate()
    .then(() => console.log('DB connected!'))
    .catch((err) => console.log('error -> ', err));