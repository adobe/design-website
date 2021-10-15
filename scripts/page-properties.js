export const PagePropertiesController = {
    callbacks: [],
    ready: false,
    properties: null,
    setProperties(props) {
        if (props.type) {
            props.type = props.type.toLowerCase();
        }        
        PagePropertiesController.properties = props;
        PagePropertiesController.ready = true;

        PagePropertiesController.runCallbacks();
    },
    runCallbacks() {
        while ( PagePropertiesController.callbacks.length > 0) {
            const cb = PagePropertiesController.callbacks.shift();
            cb(PagePropertiesController.properties);
        }
    },
};

export const resolvePageProperties = function resolvePageProperties(callback) {
    if (PagePropertiesController.ready) {
        callback(PagePropertiesController.properties);
    } else {
        PagePropertiesController.callbacks.push(callback);
    }
};
window.resolvePageProperties = resolvePageProperties;
