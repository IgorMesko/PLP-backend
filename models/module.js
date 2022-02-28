'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.studentId = this.belongsTo(models.Student, {foreignKey: 'studentId'});
    }
  }
  Module.init({
    title: DataTypes.STRING,
    color: DataTypes.STRING,
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'student',
        key: 'id',
      },
    },
  }, 
  {
    sequelize,
    modelName: 'Module',
  });
  return Module;
};