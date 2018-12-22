import _ from 'lodash';

const DEFAULT_OPTIONS = {
    searchKeys: [
        'messageId',
        'event',
        'type'
    ]
};

// TODO: Add support for searching different field types (i.e. formatted dates)

/**
 * Extremely simplified search service. Looks through predefined keys for matching substrings, cases insensitive.
 */
class SearchService {
    constructor(opts = {}) {
        this.opts = _.defaults(opts, DEFAULT_OPTIONS);
    }

    search(log, query) {
        query = query.toLowerCase();
        let isMatch = false;

        this.opts.searchKeys.forEach((searchKey) => {
            // If the search key is not an array, break it into an array of paths to support nested keys
            if( !_.isArray(searchKey) ) {
                searchKey = searchKey.split('.');
            }

            // Safely get value at the provided key
            let value = _.get(log, searchKey, '');

            // If we find a match, exit our forEach loop
            if( value.toLowerCase().includes(query) ) {
                isMatch = true;
                return false;
            }
        });

        return isMatch;
    }
}

export default SearchService;