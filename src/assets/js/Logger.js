import PouchDB from "pouchdb";

export default {
  db: new PouchDB("logs"),
  log: function (message, type) {
    const date = new Date();

    if (typeof type === "undefined") {
      type = "default";
    }

    this.db.put({
      _id: date.toISOString(),
      type: type,
      message: message
    });
  },
  getAll: function () {
    return this.db
      .allDocs({
        include_docs: true,
        attachments: true
      })
      .then(function (result) {
        return result;
      })
      .catch(function () {
        return false;
      });
  }
};
