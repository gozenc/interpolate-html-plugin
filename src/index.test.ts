/* ts-ignore-file */

const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = (fileName: any) => util.promisify(fs.readFile)(fileName, 'utf8');
const exec = util.promisify(require('child_process').exec);

beforeEach(async () => {
    jest.setTimeout(20000);
});

test.concurrent('Raw HTML and interpolated HTML are not same.', async () => {
    try {
        const rawHtml = await readFile(path.join(__dirname + '/../test/src/index.html'))
        await exec("yarn mock");
        const interpolatedHtml = await readFile(path.join(__dirname + '/../test/dist/index.html'))
        expect(interpolatedHtml).not.toBe(rawHtml)
    } catch (e) {
        console.error(e)
    }
})

test.concurrent('Raw HTML interpolated correctly', async () => {
    try {
        await exec("yarn mock");
        const interpolatedHtml = await readFile(path.join(__dirname + '/../test/dist/index.html'))
        expect(interpolatedHtml.includes("https://www.shopier.com/ShowProductNew/storefront.php?shop=vildanelsanatlari")).toBe(true)
    } catch (e) {
        console.error(e)
    }
})
