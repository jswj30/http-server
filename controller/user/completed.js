const { Todo } = require('../../models');
const { User } = require('../../models');
const { Complete } = require('../../models');
const { JoinTable } = require('../../models');
const sesseion = require('express-session');

module.exports = {
  get: (req, res) => {
    let userid = 1;
    if (userid) {
      Todo.findAll({
        where: {
          userId: userid
        },
        attributes: ['id', 'startDate', 'content'],
        include: [{
          model: User,
          attributes: ['name'],
          where: {
            id: userid
          }
        }, {
          model: Complete,
          attributes: ['important', 'complete'],
          where: {
            complete: true
          }
        }]
      })
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).send('정보를 찾을 수 없습니다.');
          }
        })
        .catch((err) => {
          res.status(500).send(err);
        })

    }
  }
};