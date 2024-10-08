const uuid = require("uuid");
const { Model, DataTypes, UUIDV4 } = require("sequelize");

module.exports = function (sequelize) {
	class User extends Model {}

	User.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
			},
			first_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			middle_name: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			address_1: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			address_2: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			state: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			country: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			zipcode: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email_verified: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			role_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Roles",
					key: "id",
				},
			}
		},
		{
			sequelize,
			modelName: "User",
			timestamps: true,
			defaultScope: {
				attributes: { exclude: ["password"] },
			},
			scopes: {
				withPassword: {
					attributes: { include: ["password"] },
				},
			},
		}
	);

	User.associate = function (models) {
		User.belongsTo(models.Role, {
			foreignKey: "role_id",
			as: "Role",
		});
	};

	return User;
};
