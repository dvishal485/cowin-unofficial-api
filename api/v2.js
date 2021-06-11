const playwright = require("playwright-aws-lambda"); export default async (a, e) => { var t = null, i = [], s = []; const { query: l } = a; e.setHeader("Content-Type", "application/json"); var r = l.p; void 0 === r && (r = "110051"); var n = -1; switch (l.f) { case "covaxin": n = 4; break; case "covishield": n = 3; break; case "sputnik": n = 5; break; case "18": n = 1; break; case "45": n = 2; break; case "free": n = 6; break; case "paid": n = 7 }t = await playwright.launchChromium({ headless: !0, handleSIGINT: !1, handleSIGTERM: !1, handleSIGHUP: !1 }); const o = await t.newContext({ userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36 OPR/68.0.3618.125" }), c = await o.newPage(); await c.route("**/*.{png,svg,jpg,jpeg,woff2,css}", a => a.abort()); try { await c.goto("https://www.cowin.gov.in/home"); var w = await c.waitForSelector('//*[@id="mat-input-0"]'); await w.type(r); var d = await c.$('//*[@class="pin-search-btn"]'); await d.click(); var p = await c.waitForSelector("div.mobile-hide"); if (-1 !== n) { var h = await p.waitForSelector("div:nth-child(1) > div:nth-child(1) > div:nth-child(" + n + ") > label:nth-child(2)"); await h.click() } await p.waitForSelector('div[class="row ng-star-inserted"]'); var v = await p.$$('div[class="row ng-star-inserted"]'); if (0 !== v.length) { var g, u; for (i.push({ error: !1 }), g = 0; g < v.length; g++) { var N = "UNKNOWN", b = "UNKNOWN", f = await v[g].$('h5[class="center-name-title"]'), k = await v[g].$('p[class="center-name-text"]'), m = await v[g].$('ul[class="slot-available-wrap"]'), x = await m.$$("li"), O = []; for (u = 0; u < x.length; u++) { var y = await c.evaluate(a => a.textContent, x[u]), C = "UNKNOWN", K = "UNKNOWN", S = y.toLowerCase(); -1 !== S.lastIndexOf("booked") && (K = C = "BOOKED", N = S.split("booked")[1].split("age")[0].replace(/ /g, ""), b = S.split("age ")[1]), -1 !== S.lastIndexOf(" na ") && (K = C = "Not Avaliable"), -1 !== S.lastIndexOf("d1") && (C = S.split("d1 ")[1].split(" ")[0], K = S.split("d2 ")[1].split(" ")[0], "UNKNOWN" === N && (N = S.split("d2 ")[1].split(K)[1].split("age")[0].replace(/ /g, ""), b = S.split("age "))), O.push({ first_dose: C, second_dose: K }) } var W = await c.evaluate(a => a.textContent, f), $ = await c.evaluate(a => a.textContent, k); s.push({ center_name: W, center_address: $, vaccine: N, age: b, sessions: O }) } i.push(s) } else i.push({ error: !0, message: "no vaccine center available in this pincode" }) } catch (a) { i.push({ error: !0, message: a.message }) } finally { await t.close(), e.status(200).send({ result: i }) } };