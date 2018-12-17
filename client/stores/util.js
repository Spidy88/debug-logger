/**
 * Utility to remove redundant selector code for selecting
 * store subtrees.
 * @param STORE_NAME The store's sub tree key
 * @param selector The selector to invoke
 * @returns {function(*, ...[*]): *}
 */
export function createSelector(STORE_NAME, selector) {
    return function selectorWrapper(state, ...args) {
        return selector(state[STORE_NAME], ...args);
    };
}