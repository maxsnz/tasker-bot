/** @type {import('sequelize-cli').Migration} */
module.exports = {
  down: async (queryInterface) => {
    await queryInterface.dropTable("Tasks");
  },
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tasks", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isFinished: {
        type: Sequelize.BOOLEAN,
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
};
