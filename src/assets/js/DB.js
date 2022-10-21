import PouchDB from "pouchdb";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);

export default {
  delete: function (db_name, id) {
    const self = this;

    if (typeof id._id !== "undefined") {
      id = id._id;
    }

    return self
      .update(db_name, { _id: id, _deleted: true })
      .then(function (response) {
        return response;
      });
  },
  destroy(db_name) {
    const db = new PouchDB(db_name);

    return db.destroy();
  },
  get: function (db_name, id) {
    const db = new PouchDB(db_name);

    return db
      .get(id)
      .then(function (response) {
        return response;
      })
      .catch(function () {
        return false;
      });
  },
  getAll: function (db_name) {
    const db = new PouchDB(db_name);

    return db
      .allDocs({
        include_docs: true,
        attachments: false
      })
      .then(function (result) {
        if (result.total_rows > 0) {
          return result.rows;
        }

        return [];
      })
      .catch(function () {
        return [];
      });
  },
  insert: function (db_name, doc) {
    const db = new PouchDB(db_name);

    return db
      .put(doc)
      .then(function (response) {
        return response.rev;
      })
      .catch(function () {
        return false;
      });
  },
  update: function (db_name, doc) {
    const self = this;

    return self.get(db_name, doc._id).then(function (response) {
      if (response) {
        doc._rev = response._rev;

        return self.insert(db_name, doc);
      }

      return false;
    });
  },
  updateOrInsert: function (db_name, doc) {
    const self = this;

    return self.update(db_name, doc).then(function (response) {
      if (response) {
        return response;
      } else {
        return self.insert(db_name, doc);
      }
    });
  }
};
