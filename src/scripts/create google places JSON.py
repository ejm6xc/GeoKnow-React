#Ethan Miller
'''
This is a script that uses the the google places textsearch api
to get all the place_id's of all the locations in St. Louis for the given input
and then passes those place_id's into the google place details api to get all the details
of all the places in st louis. It also uses the returned photo ref ID to get the photo URLS
and updates the JSON from the details api by replacing the ref id with the url of the photos
'''

import requests
import time
import json

# Create an empty dictionary to store all the place details
all_place_details = {}

# Replace with your actual Google API key
GOOGLE_API_KEY = input('Enter your Google Places API key: ')
# Google Places API base URL
PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
DETAILS_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json'

def get_places(search_query):
    payload = {
        'query': search_query,
        'key': GOOGLE_API_KEY,
    }
    response = requests.get(PLACES_API_URL, params=payload)
    data = response.json()

    places = data['results']
    next_page_token = data.get('next_page_token')

    # If there's a next_page_token, wait 2 seconds and fetch more results
    while next_page_token:
        time.sleep(2)
        payload['pagetoken'] = next_page_token
        response = requests.get(PLACES_API_URL, params=payload)
        data = response.json()

        places.extend(data['results'])
        next_page_token = data.get('next_page_token')

    return places

def get_place_details(place_id):
    payload = {
        'place_id': place_id,
        'key': GOOGLE_API_KEY,
    }
    response = requests.get(DETAILS_API_URL, params=payload)
    data = response.json()

    return data['result']

def get_photo_url(photo_reference, max_width=400):
    PHOTOS_API_URL = 'https://maps.googleapis.com/maps/api/place/photo'
    payload = {
        'photoreference': photo_reference,
        'maxwidth': max_width,
        'key': GOOGLE_API_KEY
    }
    response = requests.get(PHOTOS_API_URL, params=payload)
    return response.url


#########################################################################


# Get input for places in St. Louis
search_query = input('Enter the type of location youre looking for: ')
outputJsonFileName = search_query + '_place_details_with_photos.json'
search_query += 'in St. Louis'
places = get_places(search_query)

# Get details for each place and store them in a list
place_details_list = []
for place in places:
    place_id = place['place_id']
    place_details = get_place_details(place_id)
    place_details_list.append(place_details)

# set the photo data in the detail json
for place_details in place_details_list:
    if 'photos' in place_details:
        for photo in place_details['photos']:
            photo_reference = photo['photo_reference']
            photo_url = get_photo_url(photo_reference)
            photo['photo_reference'] = photo_url

# Save the dictionary to a JSON file
with open(outputJsonFileName, 'w') as outfile:
    json.dump(place_details_list, outfile, indent=4)
