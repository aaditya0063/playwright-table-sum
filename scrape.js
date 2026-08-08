const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({
        headless: true
    });

    const page = await browser.newPage();

    let grandTotal = 0;

    for (let seed = 68; seed <= 77; seed++) {

        const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;

        console.log(`Opening ${url}`);

        await page.goto(url, {
            waitUntil: "networkidle"
        });

        await page.waitForSelector("table");

        const pageSum = await page.evaluate(() => {

            let sum = 0;

            document.querySelectorAll("table td").forEach(td => {

                const value = parseFloat(td.innerText);

                if (!isNaN(value))
                    sum += value;

            });

            return sum;

        });

        console.log(`Seed ${seed} = ${pageSum}`);

        grandTotal += pageSum;
    }

    console.log("================================");
    console.log("FINAL TOTAL =", grandTotal);
    console.log("================================");

    await browser.close();
})();