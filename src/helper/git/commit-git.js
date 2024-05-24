const git = require('../../core/git');
let commitGit = function () {
    let INSIGHT_BOT_USERNAME = 'Lawan Chaamindu Jalayath Samarasekara';
    let INSIGHT_BOT_EMAIL = 'lawan.chaamindu1234@gmail.com';
    let commit = async function (message) {
        console.log(`Git Commit "${message}"`)
        try {
            await git.commit(INSIGHT_BOT_USERNAME, INSIGHT_BOT_EMAIL, message);
        } catch (error) {
            console.log(error);
        }
    }
    return {
        commit: commit
    };
}();
module.exports = commitGit;
