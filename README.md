# CoWIN Unofficial API
Real time CoWIN API extracted from [cowin.gov.in](https://www.cowin.gov.in/) (Educational purpose only)

## About the Project
CoWIN Official API is cached and hence is slow to get updates from. I faced problem due to this because in Vaccine Slot Notifiers, when I get the notification of slot, the vaccine is all booked by then. Hence I felt the need of a real time CoWIN API, that's why created this project.

I don't encourage any wrong practice with the API or it's knowledge. It's for educational purpose only and is just a proof of concept.

## API Usage

It only supports searching by pincode.

Usage : `https://cowin-api.vercel.app/api/pincode?p=<pincode>`

Example : [https://cowin-api.vercel.app/api/pincode?p=110051](https://cowin-api.vercel.app/api/pincode?p=110051)

You will get JSON response containing
  - Center Name
  - Center Address
  - Vaccine Slots Sessions
    - From the current date upto next 7 days
    - Dose count / NA / Booked
  - Error (if any)

If pincode is not mentioned or is invalid, it will default to `110051`

<h2 id="filter">
Filter
</h2>
You can always filter out the results according to you from the basic pincode API, but sometimes the result may be long and hence may cause runtime error (<a href="#limitations">Check out Limitations</a>) . Hence it is advisable to filter out the result directly on server side by using `filters`.

Usage : `https://cowin-api.vercel.app/api/pincode?p=<pincode>&f=<filter>`

Example : [https://cowin-api.vercel.app/api/pincode?p=110094&f=covaxin](https://cowin-api.vercel.app/api/pincode?p=110094&f=covaxin)

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
Due to limitations on runtime in Vercel (`10s`), API may result to runtime error if overused. I recommend deploying your own API and using it to a max limit of 2 calls per minute with filter applied.

### Note
Currently, `covaxin` filter is enabled as a seperate API link as well but will be removed in future, using the default [filter](#filter) feature is recommended.

### Sample Response

```json
{
  "result": [
    {
      "error": false
    },
    [
      {
        "center_name": " MCW Anarkali PHC ",
        "center_address": " INDRA PARK GALI NO-8 SOM BAZAR NR. CHANDER NAGAR BUS STAND DELHI-51, East Delhi, Delhi, 110051 ",
        "sessions": [
          " NA ",
          " Booked  COVAXIN  Age 45+",
          " NA ",
          " NA ",
          " NA ",
          " NA ",
          " NA "
        ]
      },
      {
        "center_name": " RSK Vidyalaya W ChanderNagar-1 ",
        "center_address": " Chander Nagar Road Krishna Nagar Extension Near Reliance Fresh Delhi, East Delhi, Delhi, 110051 ",
        "sessions": [
          " NA ",
          " Booked  COVAXIN  Age 18+",
          " NA ",
          " NA ",
          " NA ",
          " NA ",
          " NA "
        ]
      },
      {
        "center_name": " RSK Vidyalaya W ChanderNagar-2 ",
        "center_address": " Chander Nagar Road Krishna Nagar Extension Near Reliance Fresh Delhi, East Delhi, Delhi, 110051 ",
        "sessions": [
          " NA ",
          " Booked  COVAXIN  Age 18+",
          " NA ",
          " NA ",
          " NA ",
          " NA ",
          " NA "
        ]
      },
      {
        "center_name": " RSK Vidyalaya W ChanderNagar-3 ",
        "center_address": " Chander Nagar Road Krishna Nagar Extension Near Reliance Fresh Delhi, East Delhi, Delhi, 110051 ",
        "sessions": [
          " NA ",
          " Booked  COVAXIN  Age 18+",
          " NA ",
          " NA ",
          " NA ",
          " NA ",
          " NA "
        ]
      },
      {
        "center_name": " RSK Vidyalaya W ChanderNagar-4 ",
        "center_address": " Chander Nagar Road Krishna Nagar Extension Near Reliance Fresh Delhi, East Delhi, Delhi, 110051 ",
        "sessions": [
          " NA ",
          " Booked  COVAXIN  Age 18+",
          " NA ",
          " NA ",
          " NA ",
          " NA ",
          " NA "
        ]
      },
      {
        "center_name": " SKV Radhey Shyam Park ",
        "center_address": " SKV Radhey Shyam Park Parwana Road Khurenji Delhi - 110051, East Delhi, Delhi, 110051 ",
        "sessions": [
          " NA ",
          "D1 26  46 D2 20  COVISHIELD Age 45+",
          " NA ",
          " NA ",
          " NA ",
          " NA ",
          " NA "
        ]
      }
    ]
  ]
}
```