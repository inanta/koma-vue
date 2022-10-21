import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";
import md5 from "md5";

// import DB from "@/assets/js/DB.js";
import Logger from "@/assets/js/Logger.js";

PouchDB.plugin(PouchDBFind);

export default {
  db: new PouchDB("users"),
  createDefaultUser: function () {
    const self = this;

    self.db
      .createIndex({
        index: {
          fields: ["username", "password"]
        }
      })
      .then(function () {
        self.db
          .find({
            selector: {
              username: { $gt: "" }
            }
          })
          .then(function (result) {
            if (result.docs.length === 0) {
              self.db
                .put({
                  _id: "admin",
                  fullname: "Administrator",
                  username: "admin",
                  password: md5("admin")
                })
                .then(function () {
                  Logger.log("Default user created", "auth");
                })
                .catch(function () {
                  throw new Error();
                });
            }
          });
      })
      .catch(function () {
        Logger.log("Error while creating default user", "auth");
      });
  },
  signIn: function (username, password) {
    const self = this;

    return self.db
      .find({
        selector: {
          username: { $eq: username },
          password: { $eq: md5(password) }
        }
      })
      .then(function (response) {
        if (response.docs.length > 0) {
          Logger.log("User " + username + " successfully signed in", "auth");
          localStorage.setItem("token", "token");

          return true;
        } else {
          Logger.log(
            "Incorrect username [" +
              username +
              "] and / or password [" +
              password +
              "]",
            "auth"
          );

          return false;
        }
      });
  },
  getAll: function () {
    this.db
      .allDocs({
        include_docs: true,
        attachments: true
      })
      .then(function (result) {
        console.log(result);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
};
