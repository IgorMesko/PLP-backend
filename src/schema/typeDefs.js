const { gql } = require('apollo-server');

const typeDefs = gql`
type User {
        id: Int!
        login: String!
        password: String!
    }

    type Student {
        id: Int!
        fullName: String!
        instagram: String!
        telegram: String!
        email: String!
        data: String!
        modules: [Module!]!
    }

    type Module {
        id: Int!
        title: String!
        color: String!
    }

    input UserCreateInput {
        login: String!
        password: String!
    }

    input UserLoginInput {
        login: String!
        password: String!
    }
    
    type AuthPayLoad {
        token: String!
        user: User!
    }

    type Query {
        users: [User!]!
        students: [Student!]!
        modules: [Module!]!
    }

    type Mutation {
        registrUser(data: UserCreateInput!) : AuthPayLoad
        loginUser(data: UserLoginInput!): AuthPayLoad

        createStudent(fullName: String!, instagram: String!, telegram: String!, email: String!, data: String!): String
        editStudent(id: Int!, fullName: String!, instagram: String!, telegram: String!, email: String!, data: String!): String
        deleteStudent(id: Int!): String

        createModule(studentId: Int!, title: String!, color: String!): String
        editModule(id: Int!, title: String!, color: String!): String
        deleteModule(id: Int!): String
    }
`;

module.exports = typeDefs;