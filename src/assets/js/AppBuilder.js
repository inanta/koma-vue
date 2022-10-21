import FieldProperties from "@/assets/js/FieldProperties.js";

import fetch from "@/assets/js/AppBuilderFetch.js";

export default {
  /* Delete app(s) */
  data: function (table, columns) {
    return fetch.data(table, columns);
  },
  /* Delete app(s) */
  delete: function (apps) {
    return fetch.delete(apps);
  },
  /* Delete app record(s) */
  deleteRecords: function (app, items) {
    return fetch.deleteRecords(app, items);
  },
  /* Get table list from database */
  getTables: function (current_table) {
    return fetch.getTables(current_table);
  },
  /* Get column list from database table */
  getColumns: function (table) {
    return fetch.getColumns(table);
  },
  /* Get app by slug */
  get: function (slug, is_included_metadata) {
    return fetch.get(slug, is_included_metadata);
  },
  /* Get all app(s) */
  getAll: function () {
    return fetch.getAll();
  },
  /* Get app record(s) from selected app */
  getAllRecord: function (app) {
    return fetch.getAllRecord(app);
  },
  /* Get single record from selected app by id */
  getRecord: function (slug, id) {
    return fetch.getRecord(slug, id);
  },
  /* Get new record to app */
  insertRecord: function (app, data) {
    return fetch.insertRecord(app, data);
  },
  /* Update existing or insert new app */
  save: function (app) {
    return fetch.save(app);
  },
  /* Update app settings */
  settings: function (app, settings) {
    return fetch.settings(app, settings);
  },
  /* Strip unneeded field properties */
  stripFieldProperties: function (field) {
    let stripped_field = {};

    for (const key in field) {
      if (typeof FieldProperties[field.element][key] !== "undefined") {
        stripped_field[key] = field[key];
      }
    }

    /* Is this needed? Is field automatically has element property? */
    if (typeof stripped_field.element === "undefined") {
      stripped_field.element = field.element;
    }

    if (typeof field.name !== "undefined") {
      stripped_field.name = field.name;
    }

    if (typeof field.db_column_index !== "undefined") {
      stripped_field.db_column_index = field.db_column_index;
    }

    return stripped_field;
  },
  /* Update single record in app */
  updateRecord: function (app, data) {
    return fetch.updateRecord(app, data);
  }
};
