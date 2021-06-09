const octokit = require('../../core/octokit');
let requestOctokit = function () {
    const MAXIMUM_ITERATIONS = 100;
    const MAXIMUM_ERROR_ITERATIONS = 10;
    let setLocation = function (place) {
        return place.replace(' ', '_').toLowerCase();
    }
    let setQuery = function (location) {
        let query = '';
        for (const place of location) {
            query = query + `location:${setLocation(place)} `;
        }
        return query;
    }
    let request = async function (location) {
        let hasNextPage = true;
        let cursor = null;
        let array = [];
        let iterations = 0;
        let errors = 0;
        for (; hasNextPage;) {
            let octokitResponseModel = await octokit.request(setQuery(location), cursor);
            if(octokitResponseModel.status){
                hasNextPage = octokitResponseModel.pageInfo.hasNextPage;
                cursor = octokitResponseModel.pageInfo.endCursor;
                for(const userDataModel of octokitResponseModel.node){
                    console.log(userDataModel.login, userDataModel.followers)
                    array.push(userDataModel)
                }
                iterations ++;
            } else {
                errors ++;
            }
            if(iterations >= MAXIMUM_ITERATIONS || errors >= MAXIMUM_ERROR_ITERATIONS) hasNextPage = false;
        }
        return array;
    }
    return {
        request: request
    };
}();
module.exports = requestOctokit;