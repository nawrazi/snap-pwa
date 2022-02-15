import { ReminderToggle, SoundToggle } from './Toggles';
import { v4 as uuidv4 } from 'uuid';
import "../styles/settings.css";

export function Preferences () {
    return (
        <div className='setting-part'>
            <div className='settings-title'>
            <div className='settings-title-icon'></div>
                <label className='header'>Settings</label>
            </div>

            <div className='setting-line-flex'>
                <div className='setting-labels'>
                    <div className='setting-icon reminder-icon'></div>
                    <label className='setting-name reminder-name'>Reminders</label>
                </div>
                <div className='setting-toggle reminder-toggle'>
                    <ReminderToggle />
                </div>
            </div>

            <div className='setting-line-flex'>
                <div className='setting-labels'>
                    <div className='setting-icon sound-icon'></div>
                    <label className='setting-name sound-name'>Progress</label>
                </div>
                <div className='setting-toggle sound-toggle'>
                    <SoundToggle />
                </div>
            </div>
        </div>
    )
}

export function Routines () {
    return (
        <form id="routines-form">
            <div className='settings-title'>
            <div className='settings-title-icon'></div>
                <label className='header'>Routines</label>
            </div>

            <div className='setting-line name-line'>
                <label className='setting-name taskname-name'>Name</label>
                <input type='text' className='name-input' id="routine-name"></input>
            </div>

            <div className='setting-line start-time-line'>
                <label className='setting-name taskstart-name timeset-name'>Start Time</label>
                <input type='time' className='time-input start-time' id="start-time"></input>
            </div>

            <div className='setting-line end-time-line'>
                <label className='setting-name taskend-name timeset-name'>End Time</label>
                <input type='time' className='time-input end-time' id="end-time"></input>
            </div>

            <div className='button-container'>
                <button type="button" className='btn btn__img add-routine' onClick={saveRoutine}>Add Routine</button>
            </div>
        </form>
    )
}

function saveRoutine() {
    var name = document.getElementById("routine-name").value;
    var startTimeRaw = document.getElementById("start-time").value.split(":");
    var endTimeRaw = document.getElementById("end-time").value.split(":");

    if (name=="" || startTimeRaw.length==1 || endTimeRaw.length==1) {
        document.getElementById("routines-form").reset();
        // TODO: Tell user that input is invalid
        console.log("empty input")
        return;
    }

    var startTime = parseInt(startTimeRaw[0])*60 + parseInt(startTimeRaw[1]);
    var endTime = parseInt(endTimeRaw[0])*60 + parseInt(endTimeRaw[1]);
    var id = uuidv4();

    let routine = {
        name: name,
        id: id,
        startTime: startTime,
        endTime: endTime
    }

    var settings = JSON.parse(localStorage.getItem("settings"));
    settings.routines.push(routine);
    // settings.routines = [];      // clears the array
    // localStorage.setItem('settings', JSON.stringify(settings));
    console.log(JSON.stringify(settings))

    document.getElementById("routines-form").reset();
}