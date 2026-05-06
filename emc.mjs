//@ts-check

/** @import {EMC} from './types/mount-observer/types' */;
/** @import {AllProps, Actions} from './types/do-merge/types' */
/** @import {RAConfig} from './types/roundabout/types' */

/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions> >}
 */
export const emc = {
    enhConfig: {
        enhKey: 'DoMerge',
        spawn: 'do-merge/do-merge.js',
        withAttrs: {
            base: 'do-merge',
            _base: {
                mapsTo: 'mergeParamSets',
                instanceOf: 'Object',
            }
        }
    },
    customData: {
        weakRef: {
            properties: ['enhancedElement']
        },
        actions: {
            hydrate: {
                ifAllOf: ['mergeParamSets', 'enhancedElement']
            }
        }
    }
};

export function render(){
    return JSON.stringify(emc, null, 4);
}

console.log(render());
