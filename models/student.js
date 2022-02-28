'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.studentId = this.hasMany(models.Module, {foreignKey: 'studentId'});
    }
  }
  Student.init({
    fullName: DataTypes.STRING,
    telegram: DataTypes.STRING,
    instagram: DataTypes.STRING,
    email: DataTypes.STRING,
    data: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};