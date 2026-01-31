const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const input = 'index.html';
const distDir = './dist';
const output = path.join(distDir, 'index.html');

async function build() {
    try {
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir);
        }

        if (fs.existsSync('robots.txt')) {
            fs.copyFileSync('robots.txt', path.join(distDir, 'robots.txt'));
        }

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

        console.log(`Build complete! Size reduced from ${oldSize}KB to ${newSize}KB.`);

        if (newSize > 4) {
            console.error(`Error: file size ${newSize}KB exceeds the 4KB limit!`);
            process.exit(1);
        }
    } catch (err) {
        console.error('Build error:', err);
        process.exit(1);
    }
}

build();
