const open = require('open');

const openBrowser = ( browser, url ) => {
    open(url, {app: { name: browser}});
}

module.exports = openBrowser;
