const octokit = require('@octokit/rest')();
const fs = require('fs');

const list = {};

octokit
    .paginate(octokit.repos.listReleases.endpoint({
        owner: 'goong',
        repo: 'goong-js'
    }))
    .then(releases => {
        releases.filter(release => release.tag_name.match(/^v\d+\.\d+\.\d+(-\w+)?/)).forEach(release => {
            list[release.tag_name] = {
                released: release.published_at,
                prerelease: release.prerelease
            };
        });

        fs.writeFileSync('dist/versions.json', JSON.stringify(list, null, 4) + '\n');
        fs.writeFileSync('dist/versions.jsonp', 'const goongjsVersions = ' + JSON.stringify(list, null, 4) + ';\n');
    });
