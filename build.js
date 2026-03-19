const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const input = 'index.html';
const distDir = './dist';
const output = path.join(distDir, 'index.html');

async function build() {
    try {
        if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

        const html = fs.readFileSync(input, 'utf8');

        const result = await minify(html, {
            collapseWhitespace: false,
            conservativeCollapse: false,
            removeComments: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            decodeEntities: true,
            collapseBooleanAttributes: true,
            trimCustomFragments: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            sortAttributes: true,
            sortClassName: true,
            html5: true,
            useShortDoctype: true,
            noNewlinesBeforeTagClose: true,
            collapseInlineTagWhitespace: true
        });

        fs.writeFileSync(output, result);

        const oldSize = (fs.statSync(input).size / 1024).toFixed(2);
        const newSize = (fs.statSync(output).size / 1024).toFixed(2);
        const savings = (((oldSize - newSize) / oldSize) * 100).toFixed(1);

        console.log(`Build complete! Size reduced from ${oldSize}KB to ${newSize}KB (${savings}% saved).`);

        if (newSize > 7) {
            console.error(`❌ Error: file size ${newSize}KB exceeds the 4KB limit!`);
            process.exit(1);
        }
    } catch (err) {
        console.error('Build error:', err);
        process.exit(1);
    }
}

build();
