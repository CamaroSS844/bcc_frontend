import styles from '../../page.module.css';
import { downCaret } from '../../utils/svgs';
import { useState } from 'react';
import { addNewGrave } from '../data/apiCalls';


export const CreateNewGrave = ({ userLocation, locations ,setToggleMarkerAction, setLocations  }) => {
    const [newGraveDetails, setNewGraveDetails] = useState({
        name_of_deceased: '',
        date_of_death: '',
        date_of_burial: '',
        grave_number: '',
        grave_type: 'Standard',
        grave_status: 'New Grave',
        location: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
        },
        cemetery: "Luveve"
    });
    const [dropDownDisplay, setDropDownDisplay] = useState("none");
    const filterBtnClick = () => {
        if (dropDownDisplay == "none") {
            setDropDownDisplay("block")
        } else {
            setDropDownDisplay("none")
        }
    }

    const addGraveBtn = async () => {
        const authToken = localStorage.getItem('authToken');

        // Check if all fields are filled
        if (!newGraveDetails.name_of_deceased || !newGraveDetails.date_of_death || !newGraveDetails.date_of_burial || !newGraveDetails.grave_number) {
            alert("Please fill in all the fields");
            return;
        }

        // Check if the grave number format is correct (e.g., "12 A 34")
        if (!newGraveDetails.grave_number.match(/^\d{1,3} [A-Z] \d{1,3}$/)) {
            alert("Please enter a valid grave number format e.g., 12 A 34");
            return;
        }

        try {
            // Add the new grave to the database
            await addNewGrave(authToken, newGraveDetails);
            console.log("New Grave Added");
            setLocations({ ...locations, Luveve: { ...locations.Luveve, newGrave: [...locations.Luveve.newGrave, {key: locations.Luveve.newGrave.length,id: (locations.Luveve.newGrave.length + locations.Luveve.occupied.length + locations.Luveve.reserved.length),...newGraveDetails}] } });

            // Retrieve updated data from the database
            // await retrieveData(authToken, dispatch, initialize);
            // console.log("Data fetched and initialized.");
            

            // Close the marker action or provide any additional user feedback
            //alert("Grave added and data updated successfully!");
        } catch (error) {
            console.error("Error during operation:", error);
            alert("An error occurred while adding the grave or updating the data. Please try again.");
        }

        //setToggleMarkerAction(false);
    };


    return (< div className={styles.addGrave}>
        <span style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <button className={styles.closeBtn} onClick={() => setToggleMarkerAction(false)}>X</button>
        </span>
        <h2>Add New Grave</h2>
        <input
            type='text'
            placeholder='Name of Deceased'
            className={styles.inputFields}
            onChange={(e) => setNewGraveDetails({ ...newGraveDetails, name_of_deceased: e.target.value })}
            required
        />
        <span>
            <label>Date of Death</label>
            <input
                type='date'
                placeholder='Date of Death'
                className={styles.inputFields}
                onChange={(e) => setNewGraveDetails({ ...newGraveDetails, date_of_death: e.target.value })}
                required
            />
        </span>
        <span>
            <label>Date of Burial</label>
            <input
                type='date'
                placeholder='Date of Burial'
                className={styles.inputFields}
                onChange={(e) => setNewGraveDetails({ ...newGraveDetails, date_of_burial: e.target.value })}
                required
            />
        </span>
        <input
            type='text'
            placeholder='Grave Number e.g. 12 A 34'
            className={styles.inputFields}
            onChange={(e) => setNewGraveDetails({ ...newGraveDetails, grave_number: e.target.value })}
            required
        />
        <div className={styles.dropdown}>
            <button className={styles.dropbtn} onClick={filterBtnClick}>Grave type: {newGraveDetails.grave_type} {downCaret()}</button>
            <div className={styles.dropdownContent} style={{ display: dropDownDisplay }}>
                <a href="#" onClick={() => setNewGraveDetails({ ...newGraveDetails, grave_type: "Cascaded" })}>
                    Cascading
                </a>
                <a href="#" onClick={() => setNewGraveDetails({ ...newGraveDetails, grave_type: "Standard" })}>
                    Standard
                </a>
            </div>
        </div>
        <button className={styles.addGraveBtn} onClick={() => {
            addGraveBtn();
            setToggleMarkerAction(false);
        }}>Add Grave</button>
    </div>)
}