import { AuthenticationError } from "apollo-server-core";

export async function remove(parent, args, { models,  }) {
  try {
    const { User } = models;
    const user = await User.remove(args.id);

    if (!user) throw new Error("User not found");

    console.log({user})
    return {
      _id: user,
    }

  } catch (error) {
    throw new Error(error);
  }
}