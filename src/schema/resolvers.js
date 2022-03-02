const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const resolvers = {
    Query: {
        async users (root, args, { auth, models }) {
            if(!auth) {
                throw new Error('Not Authenticated')
            }
            return models.User.findAll();
        },
        async students (root, args, { auth, models }) {
            if(!auth) {
                throw new Error('Not Authenticated')
            }
            const student = models.Student.findAll({
                order: [['createdAt', 'DESC']],
            });
            return student;
        },
        async modules (root, args, { auth, models }) {
                        if(!auth) {
                throw new Error('Not Authenticated')
            }
            return models.Module.findAll();
        },
    },

    Mutation: {
        registrUser: async (root, args, { models }, info) => {
            const { data: { login, password } } = args;
            await models.User.create({
                login,
                password: bcrypt.hashSync(password, 10)
            });
            return "User created successfully";
        },

        loginUser: async (root, args, { models }, info) => {
            const { data: { login, password } } = args;
            const user = await models.User.findOne({
                where: {
                    login: login,
                },
            });

            if (!user) {
                throw new Error('Unable to login. Incorrect login.');
            };

            const isMatch = bcrypt.compareSync(password, user.password);

            if (!isMatch) {
                throw new Error('Unable to Login. Incorrect password.');
            };

            return {token: jwt.sign(user.toJSON(), process.env.SECRET_KEY), user};
        },

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