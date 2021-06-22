// Maps the three modals together and starts building the associated tables

const User = require("./User");
const Post = require("./Post");

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Post };