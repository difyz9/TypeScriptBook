export * from './mathUtils';
export { default as StringUtils } from './stringUtils';
export * from './userManager';
export * from './dateUtils';
export { default as DateHelper } from './dateUtils';
export * from './config';
import * as MathUtils from './mathUtils';
import StringUtils from './stringUtils';
import { UserManager } from './userManager';
import DateHelper from './dateUtils';
export declare const Utils: {
    Math: typeof MathUtils;
    String: typeof StringUtils;
    Date: typeof DateHelper;
    User: typeof UserManager;
};
//# sourceMappingURL=index.d.ts.map