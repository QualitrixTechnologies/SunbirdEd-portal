'use strict'

angular.module('playerApp')
  .service('orgDataSource', ['$q', 'config', '$rootScope', 'httpAdapter', 'toasterService', function ($q, config,
    $rootScope, httpAdapter, toasterService) {
    /**
     * @class dashboardService
     * @desc Service to manage dashboard.
     * @memberOf Services
     */
    var datasets = {
      'creation': config.URL.DASHBOARD.ORG_CREATION,
      'consumption': config.URL.DASHBOARD.ORG_CONSUMPTION
    }

    /**
     * @method getCourseDashboardData
     * @desc Convert seconds to min
     * @memberOf Services.dashboardService
     * @param {Object}  req - Request object
     * @param {string}  datasetType - Data set type
     * @returns {Promise} Promise object represents course dashboard data
     * @instance
     */
    this.getData = function (req, datasetType, headers) {
      var url = config.URL.BASE_PREFIX + config.URL.LEARNER_PREFIX + datasets[datasetType] + '/' +
      req.orgId + '?period=' + req.timePeriod
      var deferred = $q.defer()
      var response = httpAdapter.httpCall(url, '', 'GET', headers)
      response.then(function (res) {
        if (res && res.responseCode === 'OK') {
          deferred.resolve(res)
        } else {
          toasterService.error($rootScope.messages.fmsg.m0075)
          deferred.reject(res)
        }
      }, function (err) {
        toasterService.error($rootScope.messages.emsg.m0005)
        deferred.reject(err)
      })
      return deferred.promise
    }
  }])
