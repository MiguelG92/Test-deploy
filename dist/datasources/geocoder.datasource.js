"use strict";
// Copyright IBM Corp. and LoopBack contributors 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeocoderDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'geocoder',
    // A workaround for the current design flaw where inside our monorepo,
    //   packages/service-proxy/node_modules/loopback-datasource-juggler
    // cannot see/load the connector from
    //   examples/todo/node_modules/loopback-connector-rest
    connector: require('loopback-connector-rest'),
    options: {
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        timeout: 15000,
    },
    operations: [
        {
            template: {
                method: 'GET',
                url: 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress',
                query: {
                    format: '{format=json}',
                    benchmark: 'Public_AR_Current',
                    address: '{address}',
                },
                responsePath: '$.result.addressMatches[*].coordinates',
            },
            functions: {
                geocode: ['address'],
            },
        },
    ],
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let GeocoderDataSource = class GeocoderDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
exports.GeocoderDataSource = GeocoderDataSource;
GeocoderDataSource.dataSourceName = 'geocoder';
GeocoderDataSource.defaultConfig = config;
exports.GeocoderDataSource = GeocoderDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.geocoder', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], GeocoderDataSource);
//# sourceMappingURL=geocoder.datasource.js.map