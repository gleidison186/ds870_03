"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Physicians",
      [
        {
          name: "João",
          email: "joao@hotmail.com",
          password: "1234",
        },
        {
          name: "Ana",
          email: "ana@hotmail.com",
          password: "1234",
        },
        {
          name: "Maria",
          email: "maria@hotmail.com",
          password: "1234",
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Physicians", null, {}
    )
  }
};
