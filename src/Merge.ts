export interface MergeOptions {
  context?: {};
  arrayMode?: 'concat' | 'index' | 'reference';
  deep?: boolean;
  allowUndefined?: boolean;
  logger?: {
    log: (...args) => void,
    error: (...args) => void,
  };
}

export class Merge {

  /**
   * Recursive merge obj2 into obj1.
   * If options.deep is not specified, it's true by default.
   * If options.arrayMode is not specified, it's 'index' by default.
   * see {@link MergeOptions}
   * @param obj1 object 1
   * @param obj2 object 2
   * @param {MergeOptions} options
   * @returns {any}
   */
  public static merge(obj1: any, obj2: any, options: MergeOptions = {}) {
    options.deep = options.deep === undefined ? true : options.deep;
    options.arrayMode = options.arrayMode === undefined ? 'index' : options.arrayMode;
    options.logger = options.logger ? options.logger : console;
    return this.processMerge(obj1, obj2, options);
  }

  private static safetyMergeNbID = 0;
  private static safetyNbDeepCurrent: any[] = [];

  private static objectSize(obj) {
    return Object.keys(obj).length;
  }

  private static notNullNotUndefined(obj) {
    return obj !== null && obj !== undefined;
  }

  private static mergeDebugIteration(iterationNumber) {
    let txt = '|';
    for (let i = 0; i <= iterationNumber; i++) {
      txt += '-';
    }
    return txt;
  }

  private static getInitialValueForUndefined(objToMerge) {
    if (!objToMerge) {
      return {};
    }
    if (Array.isArray(objToMerge)) {
      return [];
    }
    return {};
  }

  private static processMerge(obj1: any, obj2: any, options: MergeOptions, securityMergeMyID?: string, iterationNumber = 0) {

    if (options.allowUndefined && obj1 === undefined) {
      obj1 = Merge.getInitialValueForUndefined(obj2);
    }

    if (options.allowUndefined && obj2 === undefined) {
      obj2 = Merge.getInitialValueForUndefined(obj1);
    }

    const debug = false;
    // prevent too much loops
    const securityNbDeepMax = 1000;
    if (!securityMergeMyID) {
      this.safetyMergeNbID++;
      securityMergeMyID = ((Math.random() + '').substring(2));
    }
    if (!this.safetyNbDeepCurrent) {
      this.safetyNbDeepCurrent = [];
    }
    if (!this.safetyNbDeepCurrent[this.safetyMergeNbID] || !securityMergeMyID) {
      this.safetyNbDeepCurrent[this.safetyMergeNbID] = 0;
    }
    this.safetyNbDeepCurrent[this.safetyMergeNbID]++;
    if (this.safetyNbDeepCurrent[this.safetyMergeNbID] >= securityNbDeepMax) {
      options.logger.error('Merge [' + securityMergeMyID + ']' + this.mergeDebugIteration(iterationNumber) +
        'stopping merge because of too much whiles (' + this.safetyNbDeepCurrent[this.safetyMergeNbID] + ')');
      return obj1;
    }
    // end prevent security

    // we always update obj2 into obj1 but if obj1 is not set, we return a copied obj2
    if (obj1 === undefined || obj1 === null) {

      // we have to return a copied obj2 if its an object. function are not copied
      if (obj2 && obj2.constructor && obj2.constructor === Object) {
        debug && options.logger.log('Merge [' + securityMergeMyID + ']'
          + this.mergeDebugIteration(iterationNumber) + ' return copy of obj2 (obj1 undefined)');
        if (this.objectSize(obj2) === 0) {
          return {};
        } else {
          return this.processMerge({}, obj2, options, securityMergeMyID, iterationNumber + 1);
        }
      } else if (obj2 && Array.isArray(obj2)) { // we have to return a copied array if its an array.
        if (obj2.length === 0) {
          return [];
        } else {
          return this.processMerge([], obj2, options, securityMergeMyID, iterationNumber + 1);
        }
      } else { // return obj2 if this is not an object or array (may be a function)
        debug && options.logger.log('Merge [' + securityMergeMyID + ']'
          + this.mergeDebugIteration(iterationNumber) + ' return obj2 (obj1 undefined)');
        return obj2;
      }
    }

    // if we merge 2 arrays by reference, so keep the reference to the array
    if (options.arrayMode === 'reference' && Array.isArray(obj1) && Array.isArray(obj2)) {
      obj1 = obj2;

    } else {

      if (obj2 !== undefined && obj2 !== null) {

        if (Array.isArray(obj2) && !Array.isArray(obj1)) {
          // if ob2 is an array and obj1 is not, initializing obj1 as an array
          obj1 = [];

        } else if ((obj2.constructor && obj2.constructor === Object)
          && !(obj1.constructor && obj1.constructor === Object)) {
          // if ob2 is an object and obj1 is not, initializing obj1 as an object
          obj1 = {};
        }
      }

      // we loop on obj2 enumerable properties(object)/index(array)
      for (const p in obj2) {
        if (obj2.hasOwnProperty(p)) {

          try {
            // array case with 'concat' mode
            if (options.arrayMode === 'concat' && Array.isArray(obj2)) {

              // copy the current property of obj2 into obj1
              obj1.push(obj2[p]);
              this.contextualizeMerge(obj2, p, obj1, `${obj1.length - 1}`, options, false);

            } else if (obj2[p] !== null && obj2[p] !== undefined && obj2[p] instanceof Object && options.deep) {
              // current property is an object and we want deep merge

              debug && options.logger.log('Merge [' + securityMergeMyID + ']' + this.mergeDebugIteration(iterationNumber) + ' ' + p + ':');

              const overrideProp = obj1[p] !== undefined && obj1[p] !== null;
              const res = this.processMerge(obj1[p], obj2[p], options, securityMergeMyID,
                iterationNumber + 1);
              obj1[p] = res;
              this.contextualizeMerge(res, p, obj1, p, options, overrideProp);

            } else {
              // other case : erase prop without deep merge

              debug && options.logger.log('Merge [' + securityMergeMyID + ']'
                + this.mergeDebugIteration(iterationNumber) + ' ' + p + ':' + obj2[p]);
              const overrideProp = Merge.notNullNotUndefined(obj1[p]) && Merge.notNullNotUndefined(obj2[p]);
              obj1[p] = obj2[p];
              this.contextualizeMerge(obj2, p, obj1, p, options, overrideProp);

            }
          } catch (e) {

            options.logger.error(`MergeUtils [${securityMergeMyID}] something has failed:`, e);
            // Property in destination object not set; create it and set its value.
            const overrideProp = !!obj1[p] && !!obj2[p];
            obj1[p] = obj2[p];
            this.contextualizeMerge(obj2, p, obj1, p, options, overrideProp);
          }
        }
      }
    }

    // return the result
    return obj1;
  }

  private static contextualizeMerge(src: any, srcKey: string, dest: any, destKey: string, options: MergeOptions, override: boolean) {
    if (options.context && dest) {
      // dest has no property '_context', so create it
      if (!dest.hasOwnProperty('_context')) {
        Object.defineProperty(dest.prototype ? dest.prototype : dest, '_context', {
          enumerable: false,
          value: {},
        });
      }

      const destGetMergeContextOf = dest._context;
      const srcGetMergeContextOf = src._context;

      const srcHasNoContext = (!srcGetMergeContextOf || !srcGetMergeContextOf.hasOwnProperty(`${destKey}`));
      const destHasNoContext = !destGetMergeContextOf.hasOwnProperty(`${destKey}`);

      // dest and src object has no getContext for the current property OR we want to override dest with a new context
      if ((srcHasNoContext && destHasNoContext) || override) {
        const o = destGetMergeContextOf.prototype ? destGetMergeContextOf.prototype : destGetMergeContextOf;
        Object.defineProperty(o, `${destKey}`, {
          configurable: true,
          enumerable: false,
          value: options.context,
        });
      } else {
        // src object has already context, copy it
        const descriptor = Object.getOwnPropertyDescriptor(src._context, `${destKey}`);
        const o = destGetMergeContextOf.prototype ? destGetMergeContextOf.prototype : destGetMergeContextOf;
        Object.defineProperty(o, `${destKey}`, {
          configurable: true,
          enumerable: false,
          value: descriptor.value,
        });
      }
    }
  }
}
