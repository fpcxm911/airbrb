# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Listing data structure
Each listing object in the "listings" array represents a specific property listing and contains the following properties:

- title: The title or name of the listing.
- Address: An object containing address details including street, city, postcode, and country.
    - Street: The street address of the listing.
    - City: The city where the listing is located.
    - Postcode: The postal code of the listing.
    - Country: The country where the listing is located.
- price: The price per night for the listing.
- thumbnail: The thumbnail image of the listing, encoded as a base64 data URL.

#### metadata

- metadata:

  - propertyType: The type of property (e.g., house, apartment) for the listing.
  - numberOfBathrooms: The number of bathrooms in the listing.
  - Bedrooms: An array of bedroom objects representing the bedrooms in the listing.
    - numberOfBeds: The number of beds in the bedroom.
    - roomType: The type or description of the bedroom.
  - amenities: An array of amenities offered by the listing.
  - youtubeUrl: For advanced feature thumbnail





### other

  - availability: An array of availability objects representing the availability of the listing.
      - start: The start date of the availability period.
    - end: The end date of the availability period.
```
{
  "listings": [
    {
      "id": 1,
      "title": "Luxury Villa",
      "Owner": "alina@unsw.edu.au",
      "Address": {
        "Street": "1 Kensington Street",
        "City": "Kensington",
        "Postcode": "2032",
        "Country": "Australia"
      },
      "price": 150,
      "thumbnail": "data:image/png;base64,iVBO",
      "meatadata": {
        "propertyType": "House",
        "numberOfBathrooms": 2,
        "Bedrooms": [
          {
            "numberOfBeds": 2,
            "roomType": "loft"
          },
          {
            "numberOfBeds": 1,
            "roomType": "Dungeon"
          }
        ],
        "amenities": [],
        "youtubeUrl": "https://youtube.com/watch?v=dQw4w9WgXcQ"
      },
    },
    {
        "id": 2,
        "title": "Cozy Apartment",
        "Owner": "alina@unsw.edu.au",
        "Address": {
          "Street": "1 Kensington Street",
          "City": "Kensington",
          "Postcode": "2032",
          "Country": "Australia"
        },
        "price": 150,
        "thumbnail": "data:image/png;base64,iVBO",
        "propertyType": "House",
        "numberOfBathrooms": 2,
        "Bedrooms": [
          {
            "numberOfBeds": 2,
            "roomType": "loft"
          },
          {
            "numberOfBeds": 1,
            "roomType": "Dungeon"
          }
        ],
        "reviews": [
          {
            "rating": 5,
            "comment": "great accommodation"
          },
          {
            "rating": 1,
            "comment": "poor service"
          }
        ],
        "availability": [
          {
            "start": "2020-01-01",
            "end": "2020-01-02"
          },
          {
            "start": "2020-02-03",
            "end": "2020-05-04"
          }
        ],
        "youtubeUrl": "https://youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ]
}

```