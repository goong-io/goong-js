// @flow

import DOM from '../../util/dom';
import {extend, bindAll} from '../../util/util';
import DragRotateHandler from '../handler/drag_rotate';

import type Map from '../map';

type Options = {
    showCompass?: boolean,
    showZoom?: boolean,
    visualizePitch?: boolean
};

const defaultOptions: Options = {
    showCompass: true,
    showZoom: true,
    visualizePitch: false
};

/**
 * A `NavigationControl` control contains zoom buttons and a compass.
 *
 * @implements {IControl}
 * @param {Object} [options]
 * @param {Boolean} [options.showCompass=true] If `true` the compass button is included.
 * @param {Boolean} [options.showZoom=true] If `true` the zoom-in and zoom-out buttons are included.
 * @param {Boolean} [options.visualizePitch=false] If `true` the pitch is visualized by rotating X-axis of compass.
 * @example
 * var nav = new goongjs.NavigationControl();
 * map.addControl(nav, 'top-left');
 * @see [Display map navigation controls](https://www.mapbox.com/mapbox-gl-js/example/navigation/)
 * @see [Add a third party vector tile source](https://www.mapbox.com/mapbox-gl-js/example/third-party/)
 */
class NavigationControl {
    _map: Map;
    options: Options;
    _container: HTMLElement;
    _zoomInButton: HTMLButtonElement;
    _zoomOutButton: HTMLButtonElement;
    _compass: HTMLElement;
    _compassIcon: HTMLElement;
    _handler: DragRotateHandler;

    constructor(options: Options) {
        this.options = extend({}, defaultOptions, options);

        this._container = DOM.create('div', 'goongjs-ctrl goongjs-ctrl-group');
        this._container.addEventListener('contextmenu', (e) => e.preventDefault());

        if (this.options.showZoom) {
            bindAll([
                '_updateZoomButtons'
            ], this);
<<<<<<< HEAD
            this._zoomInButton = this._createButton('goongjs-ctrl-icon goongjs-ctrl-zoom-in', 'Zoom in', () => this._map.zoomIn());
            this._zoomOutButton = this._createButton('goongjs-ctrl-icon goongjs-ctrl-zoom-out', 'Zoom out', () => this._map.zoomOut());
=======
            this._zoomInButton = this._createButton('mapboxgl-ctrl-zoom-in', 'Zoom in', (e) => this._map.zoomIn({}, {originalEvent: e}));
            DOM.create('span', `mapboxgl-ctrl-icon`, this._zoomInButton).setAttribute('aria-hidden', true);
            this._zoomOutButton = this._createButton('mapboxgl-ctrl-zoom-out', 'Zoom out', (e) => this._map.zoomOut({}, {originalEvent: e}));
            DOM.create('span', `mapboxgl-ctrl-icon`, this._zoomOutButton).setAttribute('aria-hidden', true);
>>>>>>> d5248e19aee3ddeee83a823b056c9ca49248e87a
        }
        if (this.options.showCompass) {
            bindAll([
                '_rotateCompassArrow'
            ], this);
<<<<<<< HEAD
            this._compass = this._createButton('goongjs-ctrl-icon goongjs-ctrl-compass', 'Reset bearing to north', () => {
=======
            this._compass = this._createButton('mapboxgl-ctrl-compass', 'Reset bearing to north', (e) => {
>>>>>>> d5248e19aee3ddeee83a823b056c9ca49248e87a
                if (this.options.visualizePitch) {
                    this._map.resetNorthPitch({}, {originalEvent: e});
                } else {
                    this._map.resetNorth({}, {originalEvent: e});
                }
            });
<<<<<<< HEAD
            this._compassArrow = DOM.create('span', 'goongjs-ctrl-compass-arrow', this._compass);
=======
            this._compassIcon = DOM.create('span', 'mapboxgl-ctrl-icon', this._compass);
            this._compassIcon.setAttribute('aria-hidden', true);
>>>>>>> d5248e19aee3ddeee83a823b056c9ca49248e87a
        }
    }

    _updateZoomButtons() {
        const zoom = this._map.getZoom();
<<<<<<< HEAD
        if (zoom === this._map.getMaxZoom()) {
            this._zoomInButton.classList.add('goongjs-ctrl-icon-disabled');
        } else {
            this._zoomInButton.classList.remove('goongjs-ctrl-icon-disabled');
        }
        if (zoom === this._map.getMinZoom()) {
            this._zoomOutButton.classList.add('goongjs-ctrl-icon-disabled');
        } else {
            this._zoomOutButton.classList.remove('goongjs-ctrl-icon-disabled');
        }
=======
        this._zoomInButton.disabled = zoom === this._map.getMaxZoom();
        this._zoomOutButton.disabled = zoom === this._map.getMinZoom();
>>>>>>> d5248e19aee3ddeee83a823b056c9ca49248e87a
    }

    _rotateCompassArrow() {
        const rotate = this.options.visualizePitch ?
            `scale(${1 / Math.pow(Math.cos(this._map.transform.pitch * (Math.PI / 180)), 0.5)}) rotateX(${this._map.transform.pitch}deg) rotateZ(${this._map.transform.angle * (180 / Math.PI)}deg)` :
            `rotate(${this._map.transform.angle * (180 / Math.PI)}deg)`;

        this._compassIcon.style.transform = rotate;
    }

    onAdd(map: Map) {
        this._map = map;
        if (this.options.showZoom) {
            this._map.on('zoom', this._updateZoomButtons);
            this._updateZoomButtons();
        }
        if (this.options.showCompass) {
            if (this.options.visualizePitch) {
                this._map.on('pitch', this._rotateCompassArrow);
            }
            this._map.on('rotate', this._rotateCompassArrow);
            this._rotateCompassArrow();
            this._handler = new DragRotateHandler(map, {button: 'left', element: this._compass});
            DOM.addEventListener(this._compass, 'mousedown', this._handler.onMouseDown);
            DOM.addEventListener(this._compass, 'touchstart', this._handler.onMouseDown, {passive: false});
            this._handler.enable();
        }
        return this._container;
    }

    onRemove() {
        DOM.remove(this._container);
        if (this.options.showZoom) {
            this._map.off('zoom', this._updateZoomButtons);
        }
        if (this.options.showCompass) {
            if (this.options.visualizePitch) {
                this._map.off('pitch', this._rotateCompassArrow);
            }
            this._map.off('rotate', this._rotateCompassArrow);
            DOM.removeEventListener(this._compass, 'mousedown', this._handler.onMouseDown);
            DOM.removeEventListener(this._compass, 'touchstart', this._handler.onMouseDown, {passive: false});
            this._handler.disable();
            delete this._handler;
        }

        delete this._map;
    }

    _createButton(className: string, ariaLabel: string, fn: () => mixed) {
        const a = DOM.create('button', className, this._container);
        a.type = 'button';
        a.title = ariaLabel;
        a.setAttribute('aria-label', ariaLabel);
        a.addEventListener('click', fn);
        return a;
    }
}

export default NavigationControl;
