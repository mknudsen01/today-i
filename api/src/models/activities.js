module.exports = (sequelize, DataTypes) => {
  const Activities = sequelize.define('activities', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    text: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      required: true,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
  }, {
    paranoid: true,
    underscored: true,
  });
  return Activities;
};
