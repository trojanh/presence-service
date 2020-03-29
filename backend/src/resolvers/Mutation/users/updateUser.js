export async function updateUser(parent, args, { models }) {
  try {
    const { User } = models;
    const user = await User.update(args.id, {lastSeen: (new Date()).toLocaleString()});

    if (!user) throw new Error("User not found");

    console.log({user})
    return {
      _id: user
    }

  } catch (error) {
    throw new Error(error);
  }
}