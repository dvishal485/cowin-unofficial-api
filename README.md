# CoWIN Unofficial API (Depreciated)

Real time CoWIN API extracted from [cowin.gov.in](https://www.cowin.gov.in/) (Educational purpose only)

![CoWIN Unofficial API Banner](banner.jpg)

![GitHub issues](https://img.shields.io/github/issues/dvishal485/cowin-unofficial-api)
![GitHub package.json version](https://img.shields.io/github/package-json/v/dvishal485/cowin-unofficial-api)
![GitHub](https://img.shields.io/github/license/dvishal485/cowin-unofficial-api)
[![Telegram Chat](https://img.shields.io/badge/Telegram-chat-blue?logo=telegram&style=social)](https://t.me/dvishal485)

# Depreciated Project
Since the need for CoWIN API has declined over time, the project will no longer be maintained and hence may result to errors / wrong data. For slot finders and other services, use the Official API. The services created through this API will no longer work. 


## About the Project
CoWIN Official API is cached and hence is slow to get updates from. I faced problem due to this because in Vaccine Slot Notifiers, when I get the notification of slot, the vaccine is all booked by then. Hence I felt the need of a real time CoWIN API, that's why created this project.

I don't encourage any wrong practice with the API or it's knowledge. It's for educational purpose only and is just a proof of concept.

## API Usage

![note](https://img.shields.io/badge/note-only%20supports%20searching%20by%20pincode-green)

### Introducing CoWIN API Version 2.0

Now you the data will be in a much more organized manner with much data. For V1 Documentation, [visit here](V1.md)

Usage : `https://cowin-api.vercel.app/api/v2?p=<pincode>`

Example : [https://cowin-api.vercel.app/api/v2?p=110051](https://cowin-api.vercel.app/api/v2?p=110051)

You will get JSON response containing
  - Center Name
  - Center Address
  - Vaccine Name
  - Age Limit (`18` or `45+`)
  - Vaccine Slots Sessions (from the current date upto next 7 days)
  - Vaccine Avalibility Status
  - Individual Dose Count
  - Error (if any)

If pincode is not mentioned or is invalid, it will default to `110051`

<h2 id="filter">
Filter
</h2>
You can always filter out the results according to you from the basic pincode API, but sometimes the result may be long and hence may cause runtime error (<a href="#limitations">Check out Limitations</a>) . Hence it is advisable to filter out the result directly on server side by using `filters`.

Usage : `https://cowin-api.vercel.app/api/v2?p=<pincode>&f=<filter>`

Example : [https://cowin-api.vercel.app/api/v2?p=110094&f=covaxin](https://cowin-api.vercel.app/api/v2?p=110094&f=covaxin)

Supported Filters :

  - `covaxin` : Returns results with only Covaxin
  - `covishield` : Returns results with only Covishield
  - `sputnik` : Returns results with only Sputnik V
  - `18` : Returns vaccine data only for Age 18-44
  - `45` : Returns vaccine data only for Age 45+
  - `free` : Returns only free vaccine data
  - `paid` : Returns only paid vaccine data

<h2 id="limitations">
Limitations
</h2>
Due to limitations on runtime in Vercel (10 seconds), API may result to runtime error if overused. I recommend deploying your own API and using it to a max limit of 2 calls per minute with filter applied.

### Note
Currently, `covaxin` filter is enabled as a seperate [Version 1 API link](https://cowin-api.vercel.app/api/covaxin?p=110094) as well but will be removed in future, using the default [filter](#filter) feature in Version 2 API is recommended.

## Sample Response

[Tap here](sample.json) to check out sample response