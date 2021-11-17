const db = require("./db/models");

const loginUser = (req, res, user) => {
    req.session.auth = {
      userID: user.id,
    };
  };

const logoutUser = (req, res) => {
    delete req.session.auth;
};

const restoreUser = async (req, res, next) => {
    if (req.session.auth) {
        const { userId } = req.session.auth

        try {
            const user = await db.User.findByPk(userId)

            if (user) {
                res.locals.authenticated = true
                res.locals.user = user
                next()
            }
        } catch (e) {
            res.locals.authenticated = false
            next(e)
        }
    } else {
        res.locals.authenticated = false
        next()
    }
}

const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.redirect('/user/login')
    }
    return next()
}

module.exports = {
    loginUser,
    logoutUser,
    restoreUser,
    requireAuth
}
