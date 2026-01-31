const fs = require('fs');
const minify = require('html-minifier-terser').minify;

const input = 'index.html';
const output = 'index.min.html';

async function build() {
    const html = fs.readFileSync(input, 'utf8');

    const result = await minify(html, {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
    });

    fs.writeFileSync(output, result);

    const oldSize = (fs.statSync(input).size / 1024).toFixed(2);
    const newSize = (fs.statSync(output).size / 1024).toFixed(2);

    console.log(`Готово! Размер уменьшен с ${oldSize}KB до ${newSize}KB`);
}

build();
