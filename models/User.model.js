module.exports = (sequelize, DataTypes) => {
  
  const Users = sequelize.define("Users", { 
    userId: {
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    tokenExpire: {
      type: DataTypes.DATE
    }
  })

  return Users
}