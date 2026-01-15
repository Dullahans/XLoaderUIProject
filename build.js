const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(__dirname, 'dist');

// 1. 清理並建立 dist 目錄
console.log('正在清理 dist 目錄...');
if (fs.existsSync(distDir)) {
    // Node.js v12.16.3 不支援 fs.rmSync，改用 fs.rmdirSync
    fs.rmdirSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir);

// 2. 複製目錄函數
function copyDir(src, dest) {
    if (!fs.existsSync(src)) return;
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// 3. 複製資產
console.log('正在複製資產 (assets, img, json)...');
copyDir(path.join(__dirname, 'assets'), path.join(distDir, 'assets'));
copyDir(path.join(__dirname, 'img'), path.join(distDir, 'img'));

// 4. 複製根目錄的 JSON 檔案
const files = fs.readdirSync(__dirname);
files.forEach(file => {
    if (file.endsWith('.json') && file !== 'package.json' && file !== 'package-lock.json') {
        fs.copyFileSync(path.join(__dirname, file), path.join(distDir, file));
        console.log(`已複製: ${file}`);
    }
});

// 5. 執行 html-minifier
console.log('正在壓縮 index.html...');
try {
    // 優先使用本地 node_modules 中的 html-minifier
    const minifierPath = path.join(__dirname, 'node_modules', '.bin', 'html-minifier');
    const cmd = `"${minifierPath}" --remove-comments --collapse-whitespace --minify-css true --minify-js true index.html -o dist/index.html`;
    execSync(cmd, { stdio: 'inherit' });
    console.log('建置完成！結果儲存在 dist 目錄中。');
} catch (error) {
    console.error('HTML 壓縮失敗:', error.message);
    process.exit(1);
}
