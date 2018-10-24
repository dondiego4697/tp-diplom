'use strict';
const isProd = process.env.NODE_ENV === 'production';

module.exports = (req, res) => {
    const name = 'main';

    res.render('index', {
        meta: {
            title: 'title'
        },
        res: {
            bundles: {
                styles: formPath(name, 'css'),
                scripts: formPath(name, 'js')
            },
            fonts: {
                regular: '/build/res/fonts/Heebo-Regular.ttf',
                thin: '/build/res/fonts/Heebo-Thin.ttf',
                medium: '/build/res/fonts/Heebo-Medium.ttf'
            }
        },
        global: {
            data: JSON.stringify({})
        }
    });
};

function formPath(name, format) {
    return `/build/client/${name}.bundle.${isProd ? 'min.' : ''}${format}`;
}
