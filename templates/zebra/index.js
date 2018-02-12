'use strict';

/**
 *  Zebra - Docma Default Template
 *  @author Onur Yıldırım <onur@cutepilot.com>
 *  @license MIT
 *  @since Docma 2.0.0
 */

module.exports = (template, modules) => {

    // modules: _, Promise, fs, dust, HtmlParser, utils

    const helper = require('./helper')(template, modules);

    // Template main HTML file
    template.mainHTML = 'index.html';

    // Template default options.
    template.defaultOptions = {
        title: '',
        logo: null,             // URL String or { dark: String, light: String }
        sidebar: {
            enabled: true,
            outline: 'tree',    // "flat" | "tree"
            collapsed: false,
            toolbar: true,
            folded: false,
            badges: true,       // true | false | <string>
            search: true,
            animations: true
        },
        symbols: {
            autoLink: true,     // "internal" | "external" | true (both)
            params: 'list',     // "list" | "table"
            enums: 'list',      // "list" | "table"
            props: 'list',      // "list" | "table"
            meta: false
        },
        contentView: {
            bookmarks: false
        },
        navbar: {
            enabled: true,
            animations: true,
            menuItems: []
        }
    };

    // ignore files relative to /template directory. other files in the root of
    // th module directory are already ignored.
    // template.ignore = [];

    template.preBuild(() => {

        if (helper.isOldStructureOptions) {
            helper.convertOptionsToNewStructure();
        }

        // else — options provided by the end-user is not in old-structure so we
        // leave the rest to Docma.

        helper.setDarkLightLogos();
    });

    template.postBuild(() => {
        // Display deprecated message at the end if needed
        if (helper.isOldStructureOptions) {
            const optsDeprecated =
                'Zebra Template options structure is changed in v2.0.0. ' +
                'Please update your template options.\n' +
                'See documentation @ https://onury.io/docma/?content=zebra#Template-Options';
            template.debug.log(); // empty line
            template.debug.warn(optsDeprecated);
        }
    });
};
