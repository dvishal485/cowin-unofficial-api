# CoWIN Unofficial API
Real time CoWIN API extracted from [cowin.gov.in](https://www.cowin.gov.in/) (Educational purpose only)

## About the Project
CoWIN Official API is cached and hence is slow to get updates from. I faced problem due to this because in Vaccine Slot Notifiers, when I get the notification of slot, the vaccine is all booked by then. Hence I felt the need of a real time CoWIN API, that's why created this project.

I don't encourage any wrong practice with the API or it's knowledge. It's for educational purpose only and is just a proof of concept.

## API Usage

Currently, it only supports searching by pincode.

URL : `https://cowin-api.vercel.app/api/pincode?p=<pincode>`

Example : [https://cowin-api.vercel.app/api/pincode?p=110051](https://cowin-api.vercel.app/api/pincode?p=110051)

You will get JSON response containing
  - Center Name
  - Center Address
  - Vaccine Slots Sessions
    - From the current date upto next 7 days
    - Dose count / NA / Booked
  - Error (if any)

If pincode is not mentioned or is invalid, it will default to `110051`

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