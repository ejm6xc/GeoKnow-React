import json
import os
import glob

def create_geojson_feature(place_details):
    feature = {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [
                place_details['geometry']['location']['lng'],
                place_details['geometry']['location']['lat']
            ]
        },
        'properties': place_details
    }
    return feature

# Get a list of all JSON files in the current directory
json_files = glob.glob('*.json')

# Define the output directory
output_dir = 'geojson_output'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for json_file in json_files:
    # Read the input JSON file
    with open(json_file, 'r') as infile:
        place_details_list = json.load(infile)

    # Create an empty GeoJSON object
    geojson = {
        'type': 'FeatureCollection',
        'features': []
    }

    # Convert each place_details object to a GeoJSON feature and add it to the GeoJSON object
    for place_details in place_details_list:
        feature = create_geojson_feature(place_details)
        geojson['features'].append(feature)

    # Save the GeoJSON object to a file in the output directory
    geojson_filename = os.path.splitext(json_file)[0] + '_geojson.json'
    geojson_filepath = os.path.join(output_dir, geojson_filename)
    with open(geojson_filepath, 'w') as outfile:
        json.dump(geojson, outfile, indent=4)
