// @ts-check
/** @import {Actions, PAP, AllProps, AP, MergeParameters} from './types/do-merge/types' */;
/** @import {RoundaboutOptions} from './types/roundabout/types' */;
/** @import {ElementEnhancementGateway, SpawnContext} from './types/assign-gingerly/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig} from './types/roundabout/types' */;

/**
 * @implements {Actions}
 */
class DoMerge {

    /**
     * @this {AllProps & Actions}
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    constructor(enhancedElement, ctx, initVals){
        this.init(this, enhancedElement, ctx, initVals);
    }

    /**
     * @param {AllProps} self 
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    async init(self, enhancedElement, ctx, initVals){
        const {customData} = /** @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions>>} */ (ctx.emc);
        /**
         * @type {RoundaboutOptions}
         */
        const raOptions = {
            ...customData,
            vm: self,
            initialPropVals: {
                enhancedElement,
                ...customData?.defaultPropVals,
                ...initVals
            }
        };
        (await import('roundabout-lib/roundabout.js')).roundabout(raOptions);
    }

    /**
     * @param {AP} self 
     * @returns {import('./types/do-merge/types').ProPAP}
     */
    async hydrate(self){
        const {mergeParamSets, enhancedElement} = self;
        const paramSets = Array.isArray(mergeParamSets) ? mergeParamSets : [mergeParamSets];
        const {assignFrom} = await import('assign-gingerly/assignFrom.js');

        for(const paramSet of paramSets){
            const {assign, on, options} = paramSet;
            const eventType = on || 'click';
            enhancedElement.addEventListener(eventType, () => {
                const host = enhancedElement.closest('[itemscope]');
                if(host === null) return;
                assignFrom(host, assign, {from: enhancedElement, ...options});
            });
        }

        return /** @type {import('./types/do-merge/types').PAP} */ ({resolved: true});
    }
}

export {DoMerge};
