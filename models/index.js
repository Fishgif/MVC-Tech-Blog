const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");



User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
})

User.hasMany(Comment)


Post.hasMany(Comment);


Comment.belongsTo(Post)

Comment.belongsTo(User);


module.exports = {
  Post, 
  User,
  Comment,
}