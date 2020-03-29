import { AuthenticationError } from "apollo-server-core";

export async function login(parent, args, { models,  }) {
  try {
    const { User } = models;
    const user = await User.findOne(args.username);

    if (!user) throw new Error("User not found");
    if (!User.verifyPassword(user, args.password)) {
      throw new AuthenticationError("Invalid username or password");
    }
    console.log({user})
    return {
      _id: user._id,
      username: user.username,
      token: User.getJWT(user)
    }

  } catch (error) {
    throw new Error(error);
  }
}