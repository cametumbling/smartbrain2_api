const jwt = require('jsonwebtoken');
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URI);

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json("Unauthorized.");
    }
    return res.json({ id: reply });
  });
};

const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: "2 days" });
};

// Saving token to Redis
const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

/*
const setToken = (key, value) => {
  const setData = async function () {
    try {
      const res = await redisClient.set(key, value);
      return res;
    } catch (err) {
      console.log("Problems...");
    }
  };
  return setData();
};*/

// Create JWT token and return user data
const createSessions = (user) => {
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
      .then(() => {
        return { success: "true", userId: id, token, user };
      })
      .catch(console.log);
};

module.exports = {
  getAuthTokenId,
  createSessions,
  redisClient
}
