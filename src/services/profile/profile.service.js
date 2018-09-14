// Initializes the `profile` service on path `/profile`
const createService = require("feathers-mongoose");
const createModel = require("../../models/profile.model");
const hooks = require("./profile.hooks");

module.exports = function(app) {
  const { Model, Schema } = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use("/profile", createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service("profile");

  const jsonSchema = Schema.jsonSchema();
  const schema = {
    type: "object",
    properties: {
      username: {
        type: "string"
      },
      fullname: {
        type: "string"
      },
      _id: {
        type: "string",
        pattern: "^[0-9a-fA-F]{24}$"
      },
      updatedAt: {
        type: "string",
        format: "date-time"
      },
      createdAt: {
        type: "string",
        format: "date-time"
      },
      __v: {
        type: "number"
      }
    },
    required: ["username", "fullname"]
  };

  service.docs = {
    description: "A CRUD for profiles",
    definitions: {
      profile: {
        description: "",
        ...schema
      },
      "profile list": {
        type: "array",
        items: { $ref: "#/definitions/profile" }
      }
    }
  };

  console.log("\n\nService.docs:", JSON.stringify(service.docs, null, " "));

  // console.dir(service.docs);

  service.hooks(hooks);
};
