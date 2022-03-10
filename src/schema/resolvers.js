const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticate } = require('../middleware/auth');
require('dotenv').config();

const resolvers = {
    Query: {
        users: async (root, args, { req, models }) => {
            const access = authenticate(req);
            return await models.User.findAll();
        },
        async students (root, args, { req, models }) {
            const access = authenticate(req);
            const student = models.Student.findAll({
                order: [['createdAt', 'DESC']],
            });
            return student;
        },
        async modules (root, args, { req, models }) {
            const access = authenticate(req);
            return models.Module.findAll();
        },
    },

    Mutation: {
/*         registrUser: async (root, args, { models }, info) => {
            const { data: { login, password } } = args;
            const user = await models.User.create({
                login,
                password: bcrypt.hashSync(password, 10)
            });
            
            return { token: jwt.sign({ id: user.id, login: user.login }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" })};
        },  */

        loginUser: async (root, args, { models }, info) => {
            const { login, password  } = args;
            const user = await models.User.findOne({ where: { login: login } });

            if (!user) {
                throw new UserInputError('No user found with this login credentials.');
            };

            const isMatch = bcrypt.compareSync(password, user.password);

            if (!isMatch) {
                throw new AuthenticationError('Invalid password.');
            };

            return {token: jwt.sign({ id: user.id, login }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" })};
        },

        createModule: async (root, { studentId, title, color, }, { req, models }) => {
            const access = authenticate(req);
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

        editModule: async (root, { id, title, color, }, { req, models }) => {
            const access = authenticate(req);
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

        deleteModule: async (rot, { id }, { req, models }) => {
            const access = authenticate(req);
            await models.Module.destroy({ where: {id: id} });
            return "Module deleted successfully";
        },

        createStudent: async (root, { fullName, instagram, telegram, email, data }, { req, models }) => {
            const access = authenticate(req);
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

        editStudent: async (root, { id, fullName, instagram, telegram, email, data }, { req, models }) => {
            const access = authenticate(req);
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

        deleteStudent: async (rot, { id }, { req, models }) => {
            const access = authenticate(req);
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