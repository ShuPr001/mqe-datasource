"use strict";

System.register(["lodash"], function (_export, _context) {
  "use strict";

  var _, _createClass, MQEQuery;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function trim(str) {
    var trimRegex = /^[\s]*(.*?)[\s]*$/;
    var match = str.match(trimRegex);
    return match ? match[0] : match;
  }
  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      MQEQuery = function () {

        /** @ngInject */

        function MQEQuery(target, templateSrv, scopedVars) {
          _classCallCheck(this, MQEQuery);

          this.target = target;
          this.templateSrv = templateSrv;
          this.scopedVars = scopedVars;
        }

        /////////////////////
        // Query Rendering //
        /////////////////////

        _createClass(MQEQuery, [{
          key: "render",
          value: function render(timeFrom, timeTo, interval) {
            var target = this.target;
            var query = "";
            query += target.metric;
            if (target.whereClauses.length) {
              query += " where " + this.renderWhereClauses(target.whereClauses);
            }
            query = MQEQuery.addTimeRange(query, timeFrom, timeTo);
            return query;
          }
        }, {
          key: "renderWhereClauses",
          value: function renderWhereClauses(whereClauses) {
            var _this = this;

            var renderedClauses = _.map(whereClauses, function (clauseObj, index) {
              var rendered = "";
              if (index !== 0) {
                rendered += clauseObj.condition + " ";
              }

              // Put non-numeric values into quotes.
              var value;
              if (_.isNumber(clauseObj.value) || _this.containsVariable(clauseObj.value)) {
                value = clauseObj.value;
              } else {
                value = "'" + clauseObj.value + "'";
              }
              rendered += clauseObj.column + ' ' + clauseObj.operator + ' ' + value;
              return rendered;
            });
            return renderedClauses.join(' ');
          }
        }, {
          key: "containsVariable",
          value: function containsVariable(str) {
            var variables = _.map(this.templateSrv.variables, 'name');
            var self = this;
            return _.some(variables, function (variable) {
              return self.templateSrv.containsVariable(str, variable);
            });
          }
        }], [{
          key: "getMetrics",
          value: function getMetrics() {
            var query = "describe all";
            return query;
          }
        }, {
          key: "getColumns",
          value: function getColumns(metric) {
            return "describe " + metric;
          }
        }, {
          key: "addTimeRange",
          value: function addTimeRange(query, timeFrom, timeTo, interval) {
            var timeRangeRegex = /from.*to/;
            if (!timeRangeRegex.test(query)) {
              query = trim(query) + " from " + timeFrom + " to " + timeTo;
            }
            return query;
          }
        }]);

        return MQEQuery;
      }();

      _export("default", MQEQuery);
    }
  };
});
//# sourceMappingURL=query_builder.js.map