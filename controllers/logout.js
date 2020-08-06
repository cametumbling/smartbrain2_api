const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URI);

const removeToken = (req, res) => {
  const { authorization } = req.headers;
  const delData = async function () {
    try {
      const res = await redisClient.del(authorization);
      return res;
    } catch (err) {
      console.log("Problems...");
    }
  };
  return delData();
}

const handleLogout = (req, res) => {
  return removeToken(req, res)
      .then((response) => {
        res.json(response)
      })
      .catch(console.log)
}

module.exports = {
  handleLogout
}
