const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id })
    .then(user => {
      if(user.length) {
        return res.json(user[0])
      } else {
        return res.status(400).json("Not found")
      }
    })
    .catch(err => res.status(400).json("Error retrieving user"))
}

const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  const { name, age, pet } = req.body.formInput;
  db('users')
    .where({ id })
    .update({ name, age, pet })
    .then( resp => {
      if (resp) {
        res.json("Success!")
      } else {
        res.status(400).json("Unable to update")
      }
    })
    .catch(err => res.status(400).json("Error updating profile."))
}

module.exports = {
  handleProfileGet,
  handleProfileUpdate,
};
