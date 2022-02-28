const { ApolloError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
    Query: {
        async users (root, args, { models }) {
            return models.User.findAll();
        },
        async students (root, args, { models }) {
            const student = models.Student.findAll({
                order: [['createdAt', 'DESC']],
            });
            return student;
        },
        async modules (root, args, { models }) {
            return models.Module.findAll();
        },
    },

    Mutation: {
        createModule: async (root, { studentId, title, color, }, { models }) => 
        {
            try {
                await models.Module.create({
                    studentId,
                    title,
                    color,
                });
                return "Module created successfully";
            } catch (error) {
                console.log(error);
            }
        },

        editModule: async (root, { id, title, color, }, { models }) => {
            try {
                await models.Module.update({
                    title, 
                    color,
                }, { where: { id: id } });
                return "Module updated successfully";
            } catch (error) {
                console.log(error);
            }
        },

        deleteModule: async (rot, { id }, { models }) => {
            await models.Module.destroy({ where: {id: id} });
            return "Module deleted successfully";
        },

        createStudent: async (root, { fullName, instagram, telegram, email, data }, { models }) =>
        {
            try {
                await models.Student.create({
                    fullName,
                    instagram,
                    telegram,
                    email,
                    data,
                });
                return "Student created successfully";
            } catch (error) {
                console.log(error);
            }
        },

        editStudent: async (root, { id, fullName, instagram, telegram, email, data }, { models }) => {
            try {
                await models.Student.update({
                    fullName,
                    instagram,
                    telegram,
                    email,
                    data,
                }, { where: { id: id } });
                return "Student updated successfully";
            } catch (error) {
                console.log(error);
            }
        },

        deleteStudent: async (rot, { id }, { models }) => {
            await models.Student.destroy({ where: {id: id} });
            return "Student deleted successfully";
        }
    },

    Student: {
        async modules(student) {
            return student.getModules();
        },
    },
};

module.exports = resolvers;