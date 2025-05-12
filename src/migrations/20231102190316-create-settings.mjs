/** @type {import('sequelize-cli').Migration} */
export default {
  down: async (queryInterface) => {
    await queryInterface.dropTable("Settings");
  },
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Settings", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
};
