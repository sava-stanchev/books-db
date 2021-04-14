import usersData from '../data/users.js';

export default async (req, res, next) => {
  const user = await usersData.getUserById(req.user.id);

  if (user.banDate) {
    const banDate = new Date(user.banDate);

    if (banDate.valueOf() > Date.now()) {
      return res.status(403).json({ error: `You're banned! `});
    }

    await usersData.liftBan(user.id);
  }

  await next();
};
