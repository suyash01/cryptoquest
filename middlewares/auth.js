const jwt = require("jsonwebtoken");

module.exports = {
  authenticateUser: function(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      if (decoded.role === "user") {
        req.user = decoded;
        next();
      } else
        return res.status(401).json({
          status: 0,
          msg: "Not Authorized",
          data: null
        });
    } catch (err) {
      return res.status(401).json({
        status: 0,
        msg: "Not Authorized",
        data: null
      });
    }
  },

  authenticateAuthor: function(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      if (decoded.role === "author") {
        req.user = decoded;
        next();
      } else
        return res.status(401).json({
          status: 0,
          msg: "Not Authorized",
          data: null
        });
    } catch (err) {
      return res.status(401).json({
        status: 0,
        msg: "Not Authorized",
        data: null
      });
    }
  },

  authenticateAdmin: function(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      if (decoded.role === "admin") {
        req.user = decoded;
        next();
      } else
        return res.status(401).json({
          status: 0,
          msg: "Not Authorized",
          data: null
        });
    } catch (err) {
      return res.status(401).json({
        status: 0,
        msg: "Not Authorized",
        data: null
      });
    }
  },

  authenticateAll: function(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      if (decoded) {
        req.user = decoded;
        next();
      } else
        return res.status(401).json({
          status: 0,
          msg: "Not Authorized",
          data: null
        });
    } catch (err) {
      return res.status(401).json({
        status: 0,
        msg: "Not Authorized",
        data: null
      });
    }
  }
};
