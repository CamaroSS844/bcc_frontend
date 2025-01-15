/*
[
    {
        "id": 1,
        "name_of_deceased": "Moses Doe",
        "date_of_death": "2023-12-01",
        "date_of_burial": "2023-12-10",
        "grave_number": "68 E 12",
        "grave_type": "Cascaded",
        "grave_status": "Occupied",
        "created_at": "2024-12-30T09:32:55.186849Z",
        "location": {
            "latitude": -20.093476785630237,
            "longitude": 28.489348801053524
        },
        "cemetery": "Luveve",
        "created_by": 1,
        "updated_by": 1
    },
    {
        "id": 2,
        "name_of_deceased": "Moses Doe",
        "date_of_death": "2023-12-01",
        "date_of_burial": "2023-12-10",
        "grave_number": "54 E 14",
        "grave_type": "Cascaded",
        "grave_status": "Occupied",
        "created_at": "2024-12-30T09:33:11.375952Z",
        "location": {
            "latitude": -20.32345,
            "longitude": 30.6789
        },
        "cemetery": "Luveve",
        "created_by": 1,
        "updated_by": 1
    },
    {
        "id": 3,
        "name_of_deceased": "Simon xmas",
        "date_of_death": "2022-11-14",
        "date_of_burial": "2022-11-20",
        "grave_number": "60 E 14",
        "grave_type": "Cascaded",
        "grave_status": "Occupied",
        "created_at": "2024-12-30T22:52:20.350626Z",
        "location": {
            "latitude": -20.09349756698244,
            "longitude": 28.489306556261916
        },
        "cemetery": "Luveve",
        "created_by": 1,
        "updated_by": 1
    },
    {
        "id": 4,
        "name_of_deceased": "Simon xmas",
        "date_of_death": "2022-11-14",
        "date_of_burial": "2022-11-20",
        "grave_number": "89 D 42",
        "grave_type": "Cascaded",
        "grave_status": "Reserved",
        "created_at": "2024-12-30T22:57:15.929627Z",
        "location": {
            "latitude": -20.093250079786426,
            "longitude": 28.48889193150591
        },
        "cemetery": "Luveve",
        "created_by": 1,
        "updated_by": 1
    },
    {
        "id": 5,
        "name_of_deceased": "Siphinde Kathathu",
        "date_of_death": "2024-05-01",
        "date_of_burial": "2024-05-01",
        "grave_number": "99 A 24",
        "grave_type": "Cascaded",
        "grave_status": "New Grave",
        "created_at": "2024-12-30T22:59:31.810805Z",
        "location": {
            "latitude": -20.093410453226415,
            "longitude": 28.48903945300173
        },
        "cemetery": "Luveve",
        "created_by": 1,
        "updated_by": 1
    }
]
 */

const sortStatus = (item, graveObject, key) => {
    switch (item.grave_status) {
        case "Reserved":
            graveObject.reserved = [...graveObject.reserved, {key: graveObject.reserved.length , ...item}];
            break;
        case "New Grave":
            graveObject.newGrave = [...graveObject.newGrave, {key: graveObject.newGrave.length , ...item}];
            break;
        case "Occupied":
            graveObject.occupied = [...graveObject.occupied, {key: graveObject.occupied.length , ...item}];
            break;
        default:
            break;
    }
}

export const sortData = (data) => {
    var key = 0;
    var Luveve = {
        reserved: [],
        newGrave: [],
        occupied: []
    }
    var Mvutshwa = {
        reserved: [],
        newGrave: [],
        occupied: []
    }
    var Anthlone = {
        reserved: [],
        newGrave: [],
        occupied: []
    }
    data.map((e) => {
        key ++;
        switch (e.cemetery) {
            case "Luveve":
                sortStatus(e, Luveve, key);
                break;
            case "Mvutshwa":
                sortStatus(e, Mvutshwa, key);
                break;
            case "Anthlone":
                sortStatus(e, Anthlone, key);
                break;
            default:
                break;
        }
    })
    var complete = { 
        Luveve : Luveve, 
        Mvutshwa: Mvutshwa, 
        Anthlone: Anthlone
    }
    console.log(JSON.stringify(complete));
    return complete
}