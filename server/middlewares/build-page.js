'use strict';
const isProd = process.env.NODE_ENV === 'production';

module.exports = (req, res) => {
    const name = 'main';

    res.render('index', {
        meta: {
            title: 'Face Transfer'
        },
        res: {
            bundles: {
                styles: formPath(name, 'css'),
                scripts: formPath(name, 'js')
            },
            fonts: {
                size1: '/build/res/fonts/font-size-1.ttf',
                size2: '/build/res/fonts/font-size-2.ttf',
                size3: '/build/res/fonts/font-size-3.ttf',
                size4: '/build/res/fonts/font-size-4.ttf'
            }
        },
        global: {
            data: JSON.stringify({
                path: {
                    img: '/build/res/img'
                }
            })
        }
    });
};

function formPath(name, format) {
    return `/build/client/${name}.bundle.${isProd ? 'min.' : ''}${format}`;
}
