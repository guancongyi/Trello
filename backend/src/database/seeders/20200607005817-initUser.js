'use strict';
const crypto = require('crypto')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   let md5 = crypto.createHash('md5');
   let password = md5.update('12345').digest('hex');
   let date = new Date()
    return queryInterface.bulkInsert('User', ['Congyi','mt','Zmouse'].map((name,index)=>{
      return {
        id:index+1,
        name,
        password,
        createdAt:date,
        updatedAt:date
      }
    }));

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('User',null, {})
  }
};
