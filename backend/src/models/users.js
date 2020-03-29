import db from "../lib/firestoreDb";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqid from 'uniqid';

const user = db.collection('users');
const normalizedUserName = (userName) => userName.toLowerCase();
const hashPassword = (password) => bcrypt.hashSync(password, 10);

export default {
  getJWT: (user) => {
    return jwt.sign({ username: user.username }, JWT_SECRET_KEY, { expiresIn: '1d' });
  },
  verifyPassword: (user, reqPassword) => {
    return bcrypt.compareSync(reqPassword, user.password);
  },
  findOne: (field, value) => {
    return user.where(field, "===", value).get();
  },
  findAll: () => {
    return user
      .orderBy('createdAt')
      .get()
      .then(snapshot => snapshot.docs.map(doc => doc.data()));
  },
  updateOne: (id, data) => {
    return user
      .orderBy('createdAt')
      .doc(id)
      .set(data, { merge: true });
  },
  insert: (userObj) => {
    userObj._id = uniqid();
    userObj.userName = normalizedUserName(userObj.userName);
    userObj.password = hashPassword(userObj.password);
    userObj.createdAt = (new Date()).toLocaleString();
    userObj.avatar = userObj.avatar || `https://api.adorable.io/avatars/285/${userObj.userName}.png`;

    return user
      .where("userName", "===", userObj.userName)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          return user.add(userObj);
        }
        return new Error("User with this name already exists");
      })
  },
  remove: (id) => {
    return user
      .doc(id)
      .delete()
  }
}