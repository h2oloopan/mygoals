Sequelize = require 'sequelize'
mysql = require('../infrastructure/db').mysql
config = require '../config'
Group = require './group'

User = mysql.define 'users',
    id:
        type: Sequelize.INTEGER
        primaryKey: true
        unique: true
        autoIncrement: true
        allowNull: false
    username:
        type: Sequelize.STRING
        unique: true
        allowNull: false
        validate:
            isAlphanumeric: true
            len:
                [config.system.username.min, config.system.username.max]
    email:
        type: Sequelize.STRING
        unique: true
        allowNull: false
        validate:
            isEmail: true
            len:
                [1, config.system.email.max]
    password:
        type: Sequelize.STRING
        allowNull: false

User.belongsTo Group
Group.hasMany User

module.exports = User
