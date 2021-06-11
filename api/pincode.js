const playwright = require("playwright-aws-lambda")

export default async (req, res) => {
    var browser = null
    var result = []
    var resultData = []
    const { query } = req
    res.setHeader("Content-Type", "application/json")
    var pincode = query.p
    var filter = query.f
    if (pincode === undefined) {
        pincode = '110051'
    }
    var fil = -1
    switch (filter) {
        case ('covaxin'):
            fil = 4
            break;
        case ('covishield'):
            fil = 3
            break;
        case ('sputnik'):
            fil = 5
            break;
        case ('18'):
            fil = 1
            break;
        case ('45'):
            fil = 2
            break;
        case ('free'):
            fil = 6
            break;
        case ('paid'):
            fil = 7
            break;
    }
    var browser = await playwright.launchChromium({
        headless: true,
        handleSIGINT: false,
        handleSIGTERM: false,
        handleSIGHUP: false
    })
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 OPR/68.0.3618.125'
    })
    const page = await context.newPage()
    await page.route('**/*.{png,svg,jpg,jpeg,woff2,css}', route => route.abort());
    try {
        await page.goto('https://www.cowin.gov.in/home')
        var field = await page.waitForSelector('//*[@id="mat-input-0"]')
        await field.type(pincode)
        console.log('pincode filled')
        var srchBtn = await page.$('//*[@class="pin-search-btn"]')
        await srchBtn.click()
        console.log('Search button clicked')
        var centerBox = await page.waitForSelector('div.mobile-hide')
        if (fil !== -1) {
            var filterButton = await centerBox.waitForSelector('div:nth-child(1) > div:nth-child(1) > div:nth-child(' + fil + ') > label:nth-child(2)')
            await filterButton.click()
        }
        await centerBox.waitForSelector('div[class="row ng-star-inserted"]', { timeout: 1000 })
        var center = await centerBox.$$('div[class="row ng-star-inserted"]')
        console.log('Number of centers : ' + center.length)
        if (center.length !== 0) {
            var i, k;
            result.push({ "error": false })
            for (i = 0; i < center.length; i++) {
                var name = await center[i].$('h5[class="center-name-title"]')
                var address = await center[i].$('p[class="center-name-text"]')
                var ul = await center[i].$('ul[class="slot-available-wrap"]')
                var li = await ul.$$('li')
                var centerList = []
                for (k = 0; k < li.length; k++) {
                    var c = await page.evaluate(el => el.textContent, li[k])
                    centerList.push(c)
                }
                var centerName = await page.evaluate(el => el.textContent, name)
                var centerAddress = await page.evaluate(el => el.textContent, address)
                resultData.push({
                    "center_name": centerName,
                    "center_address": centerAddress,
                    "sessions": centerList
                })
            }
            result.push(resultData)
        } else {
            result.push({
                "error": true, "message": "no vaccine center available in this pincode"
            })
        }
    } catch (e) {
        result.push({ "error": true, "message": e.message })
    } finally {
        await browser.close()
        res.status(200).send({ result })
    }
}