import { AuthenticationError } from "apollo-server-core";

export async function signup(parent, args, { models }) {
  try {
    const { User } = models;
    const user = await User.insert(newUser);
    console.log(user, user._id);
    return {
      _id: user._id,
      username: user.username,
      token: User.getJWT(user)
    };
  } catch (error) {
    throw new Error(error);
  }
}