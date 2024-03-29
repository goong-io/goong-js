// @flow

import assert from 'assert';
import supported from '@mapbox/mapbox-gl-supported';

import {version} from '../package.json';
import Map from './ui/map';
import NavigationControl from './ui/control/navigation_control';
import GeolocateControl from './ui/control/geolocate_control';
import AttributionControl from './ui/control/attribution_control';
import ScaleControl from './ui/control/scale_control';
import FullscreenControl from './ui/control/fullscreen_control';
import Popup from './ui/popup';
import Marker from './ui/marker';
import Style from './style/style';
import LngLat from './geo/lng_lat';
import LngLatBounds from './geo/lng_lat_bounds';
import Point from '@mapbox/point-geometry';
import MercatorCoordinate from './geo/mercator_coordinate';
import {Evented} from './util/evented';
import config from './util/config';
import {Debug} from './util/debug';
import {isSafari} from './util/util';
import {setRTLTextPlugin, getRTLTextPluginStatus} from './source/rtl_text_plugin';
import WorkerPool from './util/worker_pool';
import {clearTileCache} from './util/tile_request_cache';
import {PerformanceUtils} from './util/performance';

const exported = {
    version,
    supported,
    setRTLTextPlugin,
    getRTLTextPluginStatus,
    Map,
    NavigationControl,
    GeolocateControl,
    AttributionControl,
    ScaleControl,
    FullscreenControl,
    Popup,
    Marker,
    Style,
    LngLat,
    LngLatBounds,
    Point,
    MercatorCoordinate,
    Evented,
    config,

    /**
     * Gets and sets the map's [access token](https://account.goong.io/).
     *
     * @var {string} accessToken
     * @example
     * goongjs.accessToken = myAccessToken;
     * @see [Display a map](https://docs.goong.io/example/simple-map/)
     */
    get accessToken(): ?string {
        return config.ACCESS_TOKEN;
    },

    set accessToken(token: string) {
        config.ACCESS_TOKEN = token;
    },

    /**
     * Gets and sets the map's default API URL for requesting tiles, styles, sprites, and glyphs
     *
     * @var {string} baseApiUrl
     * @example
     * goongjs.baseApiUrl = 'https://api.goong.io';
     */
    get baseApiUrl(): ?string {
        return config.API_URL;
    },

    set baseApiUrl(url: string) {
        config.API_URL = url;
    },

    /**
     * Gets and sets the number of web workers instantiated on a page with GL JS maps.
     * By default, it is set to half the number of CPU cores (capped at 6).
     * Make sure to set this property before creating any map instances for it to have effect.
     *
     * @var {string} workerCount
     * @example
     * goongjs.workerCount = 2;
     */
    get workerCount(): number {
        return WorkerPool.workerCount;
    },

    set workerCount(count: number) {
        WorkerPool.workerCount = count;
    },

    /**
     * Gets and sets the maximum number of images (raster tiles, sprites, icons) to load in parallel,
     * which affects performance in raster-heavy maps. 16 by default.
     *
     * @var {string} maxParallelImageRequests
     * @example
     * goongjs.maxParallelImageRequests = 10;
     */
    get maxParallelImageRequests(): number {
        return config.MAX_PARALLEL_IMAGE_REQUESTS;
    },

    set maxParallelImageRequests(numRequests: number) {
        config.MAX_PARALLEL_IMAGE_REQUESTS = numRequests;
    },

    /**
     * Clears browser storage used by this library. Using this method flushes the Mapbox tile
     * cache that is managed by this library. Tiles may still be cached by the browser
     * in some cases.
     *
     * This API is supported on browsers where the [`Cache` API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
     * is supported and enabled. This includes all major browsers when pages are served over
     * `https://`, except Internet Explorer and Edge Mobile.
     *
     * When called in unsupported browsers or environments (private or incognito mode), the
     * callback will be called with an error argument.
     *
     * @function clearStorage
     * @param {Function} callback Called with an error argument if there is an error.
     */
    clearStorage(callback?: (err: ?Error) => void) {
        clearTileCache(callback);
    },

    workerUrl: ''
};

//This gets automatically stripped out in production builds.
Debug.extend(exported, {isSafari, getPerformanceMetrics: PerformanceUtils.getPerformanceMetrics});

/**
 * The version of Goong GL JS in use as specified in `package.json`,
 * `CHANGELOG.md`, and the GitHub release.
 *
 * @var {string} version
 */

/**
 * Test whether the browser [supports Goong GL JS](https://docs.goong.io/example/check-for-support/).
 *
 * @function supported
 * @param {Object} [options]
 * @param {boolean} [options.failIfMajorPerformanceCaveat=false] If `true`,
 *   the function will return `false` if the performance of Goong GL JS would
 *   be dramatically worse than expected (e.g. a software WebGL renderer would be used).
 * @return {boolean}
 * @example
 * goongjs.supported() // = true
 * @see [Check for browser support](https://docs.goong.io/example/check-for-support/)
 */

/**
 * Sets the map's [RTL text plugin](https://docs.goong.io/plugins/#mapbox-gl-rtl-text).
 * Necessary for supporting the Arabic and Hebrew languages, which are written right-to-left. Mapbox Studio loads this plugin by default.
 *
 * @function setRTLTextPlugin
 * @param {string} pluginURL URL pointing to the Mapbox RTL text plugin source.
 * @param {Function} callback Called with an error argument if there is an error.
 * @param {boolean} lazy If set to `true`, goongjs will defer loading the plugin until rtl text is encountered,
 *    rtl text will then be rendered only after the plugin finishes loading.
 * @example
 * goongjs.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js');
 * @see [Add support for right-to-left scripts](https://docs.goong.io/example/mapbox-gl-rtl-text/)
 */

/**
  * Gets the map's [RTL text plugin](https://docs.goong.io/plugins/#mapbox-gl-rtl-text) status.
  * The status can be `unavailable` (i.e. not requested or removed), `loading`, `loaded` or `error`.
  * If the status is `loaded` and the plugin is requested again, an error will be thrown.
  *
  * @function getRTLTextPluginStatus
  * @example
  * const pluginStatus = goongjs.getRTLTextPluginStatus();
  */

export default exported;

// canary assert: used to confirm that asserts have been removed from production build
assert(true, 'canary assert');
