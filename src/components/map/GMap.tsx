import React, { useState, useEffect, useCallback } from 'react';
import {
    GoogleMap,
    MarkerClusterer,
    Marker,
    useLoadScript,
} from '@react-google-maps/api';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
//import {
//    Combobox,
//    ComboboxInput,
//    ComboboxPopover,
//    ComboboxList,
//    ComboboxOption,
//} from '@reach/combobox';
//import '@reach/combobox/styles.css';

export default function Places(props: Props) {
    const { isLoaded } = useLoadScript({
        language: props.language,
        googleMapsApiKey: props.apiKey,
        libraries: props.libraries, // type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
    });

    if (!isLoaded) return <div>Loading...</div>;
    return (
        <Map
            center={props.center}
            hideMap={props.hideMap}
            markers={props.markers}
            onSelect={props.onSelect}
        />
    );
}
type Props = {
    apiKey?: string;
    language?: string;
    center?: { lat: number; lng: number };
    hideMap?: boolean;
    markers?: { position: { lat: number; lng: number }; icon: string }[];
    zoom?: number;
    onSelect(): google.maps.GeocoderResult[];
    clusterImagePath?: string;
    libraries?: (
        | 'drawing'
        | 'geometry'
        | 'localContext'
        | 'places'
        | 'visualization'
    )[];
};
Places.defaultProps = {
    center: { lat: 38.2466, lng: 21.7346 },
    language: 'en',
    hideMap: false,
    markers: [],
    zoom: 10,
    clusterImagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    libraries: ['places'],
};

function Map(props: Props) {
    const [selected, setSelected] = useState(null);
    const [center, setCenter] = useState(props.center);
    useEffect(() => {
        getCurrentLocation();
    }, []);
    const getCurrentLocation = () => {
        navigator?.geolocation.getCurrentPosition(
            ({ coords: { latitude: lat, longitude: lng } }) => {
                const pos = { lat, lng };
                setCenter(pos);
                setSelected(pos);
            }
        );
    };
    const [map, setMap] = useState(null);
    const onLoad = useCallback((map) => setMap(map), []);
    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            props.markers.map((marker) => {
                bounds.extend({
                    lat: marker.position.lat,
                    lng: marker.position.lng,
                });
            });

            map.fitBounds(bounds);
        }
    }, [map, props.markers]);
    const options = {
        imagePath: props.clusterImagePath, // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
    };

    return (
        <>
            <div className="places-container">
                <PlacesAutocomplete
                    setSelected={setSelected}
                    setCenter={setCenter}
                    onSelect={props.onSelect}
                />
                <button
                    className="cs-button cs-component cs-raised cs-primary"
                    onClick={() => getCurrentLocation()}
                >
                    <span className="cs-button-label cs-c">Find me</span>
                </button>
            </div>

            {!props.hideMap && (
                <></>
                //<GoogleMap
                //    options={{ scrollwheel: null }}
                //    onLoad={onLoad}
                //    zoom={props.zoom}
                //    center={center}
                //    mapContainerClassName="map-container"
                //>
                //    {selected && <Marker position={selected} />}
                //    <MarkerClusterer options={options}>
                //        {(clusterer) => (
                //            <>
                //                {props.markers.map((marker, index) => (
                //                    <Marker
                //                        key={index}
                //                        position={marker.position}
                //                        icon={marker.icon}
                //                        clusterer={clusterer}
                //                    />
                //                ))}
                //            </>
                //        )}
                //    </MarkerClusterer>
                //</GoogleMap>
            )}
        </>
    );
}

const PlacesAutocomplete = ({ setSelected, setCenter, onSelect }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        onSelect(results);
        const { lat, lng } = await getLatLng(results[0]);
        setCenter({ lat, lng });
        setSelected({ lat, lng });
    };

    return (
        <>
            <div className="actions-container">
                {/*<Combobox onSelect={handleSelect}>
                    <ComboboxInput
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={!ready}
                        className="combobox-input"
                        placeholder="Search an address"
                    />
                    <ComboboxPopover>
                        <ComboboxList>
                            {status === 'OK' &&
                                data.map(({ place_id, description }) => (
                                    <ComboboxOption
                                        key={place_id}
                                        value={description}
                                    />
                                ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>*/}
            </div>
        </>
    );
};
