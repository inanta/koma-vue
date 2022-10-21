import DB from "@/assets/js/DB.js";

export default {
  delete: async function (apps) {
    let results = [];

    for (let index = 0; index < apps.length; index++) {
      const item = apps[index];
      const result = {};

      result[item._id] = await DB.delete("apps", item._id);
      results.push(result);
    }

    return results;
  },
  deleteRecords: async function (app, items) {
    let results = [];

    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const result = {};

      result[item._id] = await DB.delete(app.table, item._id);
      results.push(result);
    }

    return results;
  },
  getTables: async function () {
    return ["apps", "users", "products", "logs"];
  },
  getColumns: async function (table) {
    let columns = {
      apps: ["_id", "name", "table", "slug", "containers"],
      users: ["_id", "fullname", "username", "password", "email", "info"],
      products: ["_id", "product_name", "price"],
      logs: ["_id", "type", "message"]
    };

    if (typeof columns[table] !== "undefined") {
      return columns[table];
    }

    return [];
  },
  // fetchData: function (table, label_column, value_column, callback) {
  //   const baseURI =
  //     "https://labs.8daysproject.com/backend/index.php/page/admin/service/page/appbuilderdata/" +
  //     table +
  //     "/" +
  //     label_column +
  //     "/" +
  //     value_column;

  //   axios
  //     .get(baseURI)
  //     .then((result) => {
  //       callback(result.data);
  //     })
  //     .catch(function () {
  //       callback(["column_1", "column_2", "column_3", "column_4", "column_5"]);
  //     });
  // },
  get: function (slug) {
    return DB.get("apps", slug);
  },
  getAll: function () {
    return DB.getAll("apps").then(function (records) {
      let apps = [];

      for (let index = 0; index < records.length; index++) {
        const app = records[index];

        app.doc.action = app.id;
        apps.push(app.doc);
      }

      return apps;
    });
  },
  save: function (app) {
    app._id = app.slug;

    return DB.updateOrInsert("apps", app);
  },
  getAllRecord(app) {
    return DB.getAll(app.table).then(function (records) {
      let headers = [
        {
          hideable: false,
          label: "_id",
          searchable: false,
          sortable: false,
          value: "_id",
          visible: true
        }
      ];
      let items = [];

      for (let index = 0; index < app.columns.length; index++) {
        const column = app.columns[index];

        headers.push({
          visible:
            typeof column.visible === "undefined" ? true : column.visible,
          label: column.label,
          value: column.name
        });
      }

      headers.push({
        hideable: false,
        label: "Action",
        sortable: false,
        value: "action",
        visible: true
      });

      for (let index = 0; index < records.length; index++) {
        const record = records[index];

        items.push(record.doc);
      }

      return { headers: headers, items: items };
    });
  },
  getRecord(db, id) {
    return DB.get(db, id);
  },
  insertRecord: function (app, data) {
    data._id = Date.now().toString();

    return DB.insert(app.table, data);
  },
  settings: function (app, settings) {
    const self = this;
    // console.log("SETTINGS", app, settings);

    return self.get(app.slug).then(function (app) {
      for (
        let header_index = 0;
        header_index < settings.headers.length;
        header_index++
      ) {
        const header = settings.headers[header_index];

        for (let index = 0; index < app.columns.length; index++) {
          const column = app.columns[index];

          if (column.name == header.value) {
            // console.log(column);
            column.visible = header.visible;
          }
        }
      }

      return self.save(app);
    });
  },
  updateRecord: function (app, data) {
    return DB.update(app.table, data);
  },
  _getFields: function (app) {
    // console.log(app.containers);
    let fields = [];

    for (
      let container_index = 0;
      container_index < app.containers.length;
      container_index++
    ) {
      const container = app.containers[container_index];

      // app.containers[container_index] = {
      //   name: container.name,
      //   rows: []
      // };

      for (let row_index = 0; row_index < container.rows.length; row_index++) {
        const row = container.rows[row_index];

        // app.containers[container_index]["rows"][row_index] = {
        //   name: row.name,
        //   grid: row.grid,
        //   columns: []
        // };

        for (let index = 0; index < row.columns.length; index++) {
          const column = row.columns[index];

          fields.push(column);
        }
      }

      return fields;
    }
  }
};
