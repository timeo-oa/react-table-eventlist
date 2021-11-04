import {Random} from 'random-js';
/* A function that will generate random events to be displayed by the EventList

@param: Track ID: Number (20 digits) - Making use of the BigInteger Library: https://silentmatt.com/biginteger/
@param: Status: String (New or Monitor) w/ associated color (Red Or Yellow)
@param: Hits: Number: Random integer from 1 - 1000
@param: First Detect: Date Time in UTC Format randomized
@param: Duration: Date time in (mm:ss) ex: (04:09)
@param: Location: Long & Latitude Coordinates ex: (39.72397°,-93.52994°)


Input: No args
Output: An object with ag-grid specified row keys & randomized values. 
Ex: 
{
    track-id: "3603580381106963239",
    status: "New",
    hits: "38",
    first-detect: "16:16:36",
    duration: "04:09",
    location: "39.72397°,-93.52994"
}
*/

export default function createEvents() {
    const event = {};
    //Generate unique track id
    event['track-id'] = new Random().integer(1000, 9999);
    event['status'] = 'New';
    event['hits'] = new Random().integer(100,999);
    event['first-detect'] = `${new Random().integer(0,60)}:${new Random().integer(0,60)}:${new Random().integer(0,60)}`;
    event['duration'] = `${new Random().integer(0,15)}:${new Random().integer(0,60)}`;
    event['location'] = [`${new Random().integer(-99,99)}.${new Random().integer(0,99999)}°`,<br /> ,`${new Random().integer(-99,99)}.${new Random().integer(0,99999)}°`];
    return event;
}
