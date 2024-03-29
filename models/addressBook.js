module.exports=(sequelize,Sequelize)=>{
    return sequelize.define(
        'addressBook',
        {
            title:{
                type: Sequelize.STRING,
                allowNull:false,
            },
            addressLine1:{
                type: Sequelize.STRING,
                allowNull:false,
            },
            addressLine2:{
                type: Sequelize.STRING,
                allowNull:false,
            },
            country:{
                type: Sequelize.STRING,
                allowNull:false,
            },
            state:{
                type: Sequelize.STRING,
                allowNull:false,
            },
            city:{
                type: Sequelize.STRING,
                allowNull:false,
            },
            pin_code:{
                type: Sequelize.STRING,
                allowNull:false,
            }
        },  
        { freeZeTableName: true, timestamps: false }
    )

}