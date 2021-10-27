This small example was setup to demonstrate running Fusion Charts via puppeteer, and the subsequent issue where the watermark is still being shown even though the license is being set in the `FusionCharts.ready` event and before the `new FusionCharts(chartData).render()` call.

1. `npm install`
2. `npm run server`, responsible for serving up the fusionchart files statically
3. Go to `src/index.js`, and on line `97` set a valid license key where it says `VALID-LICENCE-KEY-HERE`
4. `npm start`
5. Chromium will open a new window showing the chart

**Expected Result**

Expect to see the chart without the watermark.

**Actual Result**

The chart is still shown with the watermark.