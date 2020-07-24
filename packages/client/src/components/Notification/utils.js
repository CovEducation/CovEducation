import PropTypes from 'prop-types';
let globalCssModule;

export function mapToCssModules(className = '', cssModule = globalCssModule) {
    if (!cssModule) return className;
    return className
        .split(' ')
        .map(c => cssModule[c] || c)
        .join(' ');
}

export function omit(obj, omitKeys) {
    const result = {};
    Object.keys(obj).forEach(key => {
        if (omitKeys.indexOf(key) === -1) {
            result[key] = obj[key];
        }
    });
    return result;
}

export function pick(obj, keys) {
    const pickKeys = Array.isArray(keys) ? keys : [keys];
    let length = pickKeys.length;
    let key;
    const result = {};

    while (length > 0) {
        length -= 1;
        key = pickKeys[length];
        result[key] = obj[key];
    }
    return result;
}

export const tagPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
    PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
    ]))
]);

export const TransitionTimeouts = {
    Fade:     150, // $transition-fade
    Collapse: 350, // $transition-collapse
    Modal:    300, // $modal-transition
    Carousel: 600, // $carousel-transition
};

export const TransitionPropTypeKeys = [
    'in',
    'mountOnEnter',
    'unmountOnExit',
    'appear',
    'enter',
    'exit',
    'timeout',
    'onEnter',
    'onEntering',
    'onEntered',
    'onExit',
    'onExiting',
    'onExited',
];