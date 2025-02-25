(function () {
  var fetch = require("node-fetch");
  var mkFhir = require("../fhir");

  // Build a backwards compatiable defer object
  var defer = function () {
    var def = {};
    def.promise = new Promise(function (resolve, reject) {
      def.resolve = resolve;
      def.reject = reject;
    });
    return def;
  };

  var adapter = function (handleNotOkResponse) {
    return {
    defer: defer,
    http: function (args) {
      if (args.data && typeof args.data === "string") {
        // Setting args.json requires args.body to be a JSON as per request docs.
        try {
          args.body = JSON.parse(args.data);
        } catch (e) {
          throw new Error("Failed to parse. Expected JSON data...");
        }
      } else if (args.data) {
        args.body = args.data;
      }
      // url should be relative to baseUrl.
      if (args.url) {
        args.url = args.url.replace(args.baseUrl, "");
      }
      if (args.url === "") {
        args.url = "/";
      }
      if (args.debug) {
        console.log("DEBUG[node]: (request)", args);
      }
      return fetch(`${args.baseUrl}${args.url}`, {
        method: args.method,
        body: args.body ? JSON.stringify(args.body) : undefined,
        headers: args.headers,
      }).then(function (response) {
        if (!response.ok) {
          if (handleNotOkResponse) {
            return handleNotOkResponse(response);
          }
          throw new Error(
            `HTTP error, status = ${response.status} ${response.statusText}`
          );
        }
        return response.text().then(function (body) {
          let parsedBody;
          try {
            parsedBody = JSON.parse(body);
          } catch (e) {
            parsedBody = body;
          }
          var resp = {
            data: parsedBody,
            status: response.status,
            headers: response.headers.get,
            config: args,
          };

          if (args.debug) {
            console.log("DEBUG[node]: (response)", resp);
          }

          return resp;
        });
      });
    },
    }
  };

  module.exports = function (config, handleNotOkResponse) {
    return mkFhir(config, adapter(handleNotOkResponse));
  };
}).call(this);
