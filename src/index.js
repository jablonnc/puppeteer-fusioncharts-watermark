const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

// const fusionchartsSource = require('./fusioncharts');

 /*
 Set to true if you wish to keep the browser open for debugging purposes.
 If you do this, you will manually have to close the chromium instance.
 */
const KEEP_BROWSWER_OPEN = true;

(async () => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Export</title>
        </head>
        <body>
            <div id='chart-container'></div>
        </body>
        </html>
    `;
    
    const browser = await puppeteer.launch({
        devtools: true,
        // slowMo: 250
    });
    const page = await browser.newPage();

    await page.setBypassCSP(true);
    await page.setContent(htmlContent);
    await page.addScriptTag({ url: "http://localhost:3000/fusioncharts/fusioncharts.js" });

    await page.evaluate(
        () => {
            return new Promise((resolve) => {
                FusionCharts.ready(function () {
                    const chartData = {
                        type: 'msline',
                        renderAt: 'chart-container',
                        dataFormat: 'json',
                        dataSource: {
                            categories: [{
                                category: [{ label: '1' }, { label: '2' }]
                            }],
                            dataset: [{
                                seriesname: 'Test',
                                data: [{ value: '1' }, { value: '2' }]
                            }]
                        }
                    };

                    // Set the licence key here
                    FusionCharts.options.license({
                        key: 'VALID-LICENCE-KEY-HERE',
                        creditLabel: false
                    });

                    chartData.events = {
                        renderComplete: resolve
                    };

                    new FusionCharts(chartData).render();
                });
            });
        });

    await page.screenshot({ path: 'screenshot.png' });

    if (!KEEP_BROWSWER_OPEN) {
        await browser.close();
    }
})();
 