/** @type {import('sequelize-cli').Migration} */
export default {
  down: async (queryInterface) => {
    await queryInterface.dropTable("Tests");
  },
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tests", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
};
