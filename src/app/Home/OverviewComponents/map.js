import React, { useEffect, useState } from 'react';
import {
    APIProvider,
    Map,
} from '@vis.gl/react-google-maps';
import styles from './../page.module.css';
import { sortData } from './data/dataSorting';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { dataSelector } from '@/lib/features/dataStorageSlice';
import { downCaret } from '../utils/svgs';
import { PoiMarkers } from './pointsOfInterest';
import { addNewGrave, retrieveData } from './data/apiCalls';
import { initialize, addNew, updateGrave } from '@/lib/features/dataStorageSlice';
import { CreateNewGrave } from './mapComponents/createNewGrave';



function LocalMap() {

    const [filterOption, setFilterOption] = useState("New Graves");
    const [markerFilter, setMarkerFilter] = useState("newGrave");
    const color = {
        newGrave: '#9900ff',
        reserved: '#FFA500',
        occupied: 'red'
    }
    const [dropDownDisplay, setDropDownDisplay] = useState("none");
    const [dateValue, setDateValue] = useState('');
    const authToken = localStorage.getItem('authToken');
    const dispatch = useAppDispatch();
    const [requiredDetailsKey, setRequiredDetailsKey] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [toggleMarkerAction, setToggleMarkerAction] = useState(false);
    const [locations, setLocations] = useState({
        Luveve: {
            reserved: [],
            newGrave: [],
            occupied: []
        }, Mvutshwa: {
            reserved: [],
            newGrave: [],
            occupied: []
        }, Anthlone: {
            reserved: [],
            newGrave: [],
            occupied: []
        }
    });
    const data = useAppSelector(dataSelector);

    useEffect(() => {
        setLocations(sortData(data));
        // if (toggleMarkerAction) {
        //     alert("Grave added and data updated successfully!");
        // }
    }, [data])

    const [userLocation, setUserLocation] = useState([{
        key: -2, id: -2, location: { latitude: -20.093476785630237, longitude: 28.489348801053524 }
    }]);

    const handleClick = (val) => {
        setFilterOption(val);
        //filter the markers and make the map pan to show 
        //where there are the most number  of markers
        if (val == "New Graves") {
            setMarkerFilter("newGrave")
        } else if (val == "Reserved") {
            setMarkerFilter("reserved")
        } else if (val == "Occupied") {
            setMarkerFilter("occupied")
        }
    }

    const popUp = (val, key, popUpInfo) => {
        setToggleMarkerAction(val);
        if (popUpInfo == "showDetails") {
            setShowDetails(true);
            setRequiredDetailsKey(key);
        } else {
            setShowDetails(false);
        }

    }

    const filterBtnClick = () => {
        if (dropDownDisplay == "none") {
            setDropDownDisplay("block")
        } else {
            setDropDownDisplay("none")
        }
    }


    return (
        <>
            <APIProvider
                apiKey={'AIzaSyD-r--dhxYovA13Edk1gvre6ILosbCijTk'} onLoad={() => console.log('Maps API has loaded.')}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div className={styles.mapStyles}>

                        <Map
                            defaultZoom={16}
                            defaultCenter={{ lat: -20.093476785630237, lng: 28.489348801053524 }}
                            mapId='2d7e4d007fa262a0'
                            onCameraChanged={(ev) =>
                                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                            }>
                            <PoiMarkers pois={locations['Luveve'][markerFilter]} color={color[markerFilter]} toggleData={popUp} />
                            <PoiMarkers pois={userLocation} color={'green'} toggleData={popUp} newLocation={setUserLocation} />
                        </Map>
                        <div className={styles.filterBar}>

                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn} onClick={filterBtnClick}>Filter: {filterOption}</button>
                                <div className={styles.dropdownContent} style={{ display: dropDownDisplay }}>
                                    <a href="#" onClick={() => handleClick("New Graves")}>New Graves</a>
                                    <a href="#" onClick={() => handleClick("Reserved")}>Reserved</a>
                                    <a href="#" onClick={() => handleClick("Occupied")}>Occupied</a>
                                </div>
                            </div>
                            <div >
                                <input type='date' name='time' value={dateValue} onChange={ev => setDateValue(ev.target.value)} className={styles.filterInputs} />
                            </div>
                        </div>
                    </div>
                </div>
            </APIProvider>
            {toggleMarkerAction ?
                <div className={styles.markerContent} >
                    {showDetails ?
                        <div className={styles.graveDetails} >
                            <span style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                <button className={styles.closeBtn} onClick={() => setToggleMarkerAction(false)}>X</button>
                            </span>
                            <h2>Grave Details</h2>
                            <table style={{ width: '100%', height: '50%' }}>
                                <tbody>
                                    <tr>
                                        <th>Name of Deceased:</th>
                                        <td>{JSON.stringify(locations['Luveve'][markerFilter][requiredDetailsKey]['name_of_deceased'])}</td>
                                    </tr>
                                    <tr>
                                        <th>Date of Death:</th>
                                        <td>{JSON.stringify(locations['Luveve'][markerFilter][requiredDetailsKey]['date_of_death'])}</td>
                                    </tr>
                                    <tr>
                                        <th>Date of Burial:</th>
                                        <td>{JSON.stringify(locations['Luveve'][markerFilter][requiredDetailsKey]['date_of_burial'])}</td>
                                    </tr>
                                    <tr>
                                        <th>Grave Number:</th>
                                        <td>{JSON.stringify(locations['Luveve'][markerFilter][requiredDetailsKey]['grave_number'])}</td>
                                    </tr>
                                    <tr>
                                        <th>Grave Type:</th>
                                        <td>{JSON.stringify(locations['Luveve'][markerFilter][requiredDetailsKey]['grave_type'])}</td>
                                    </tr>
                                    <tr>
                                        <th>Grave Status:</th>
                                        <td>{JSON.stringify(locations['Luveve'][markerFilter][requiredDetailsKey]['grave_status'])}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                        :
                        <CreateNewGrave userLocation={userLocation[0].location} locations={locations} setToggleMarkerAction={setToggleMarkerAction} setLocations={setLocations}/>
                    }
                </div>
                : null
            }
        </>
    )
}

export default LocalMap;
