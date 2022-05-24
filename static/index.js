
let todayAlarms = []

showAlarms()

// Get all the checkboxes from the DOM
let monday = document.getElementById('monday')
let tuesday = document.getElementById('tuesday')
let wednesday = document.getElementById('wednesday')
let thursday = document.getElementById('thursday')
let friday = document.getElementById('friday')
let saturday = document.getElementById('saturday')
let sunday = document.getElementById('sunday')

let everyday = document.getElementById('everyday')

// Adding eventListener for the everyday checkbox
everyday.addEventListener('change', () => {

    if (everyday.checked) {
        // On checking the everyday checkbox all days checkboxes will be checked
        monday.checked = tuesday.checked = wednesday.checked = thursday.checked = friday.checked = saturday.checked = sunday.checked = true
    }
    else {
        // On unchecking the everyday checkbox all days checkboxes will be unchecked
        monday.checked = tuesday.checked = wednesday.checked = thursday.checked = friday.checked = saturday.checked = sunday.checked = false
    }
})

const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
today = document.getElementById('today')
setInterval(() => {
    // For displaying realtime date and time in Navbar
    let toDate = new Date()
    let formattedDate = convertDateTo12hrs(toDate)
    today.innerText = `Today: ${days[toDate.getDay()]}, ${formattedDate}`
}, 1000)

// Adding eventListner to the set Alarm button
document.getElementById("setAlarm").addEventListener('click', (e) => {

    let time = document.getElementById('time')
    
    // Adding code for label
    let labelInp=document.getElementById("label").value
    
    if (time.value == '' || ((!monday.checked && !tuesday.checked && !wednesday.checked && !thursday.checked && !friday.checked && !saturday.checked && !sunday.checked))||(labelInp.length>40)) {
        // If alarm time is not entered OR no day checkbox is checked, display an alert message for the same
        alert("Please make sure to fill both time and day\nand Label should be less than 40 characters")
    }
    else {
        // set the time and days in alarms, store it in localStorage and show them in the DOM 
        let days = [0, 0, 0, 0, 0, 0, 0]
        if (sunday.checked) {
            days[0] = 1;
        }
        if (monday.checked) {
            days[1] = 1;
        }
        if (tuesday.checked) {
            days[2] = 1;
        }
        if (wednesday.checked) {
            days[3] = 1;
        }
        if (thursday.checked) {
            days[4] = 1;
        }
        if (friday.checked) {
            days[5] = 1;
        }
        if (saturday.checked) {
            days[6] = 1;
        }

        // Alarm Object
        let alarm = {
            time: time.value,
            weekdays: days,
            label:labelInp
        }

        
        let alarms = localStorage.getItem('alarms');
        let alarmsObj;
        if (alarms == null) {
            alarmsObj = []
        }
        else {
            alarmsObj = JSON.parse(alarms)
        }
        // Store the alarm object into the localStorage
        alarmsObj.push(alarm)
        localStorage.setItem('alarms', JSON.stringify(alarmsObj));
        // After setting the alarm we have to clear the input fields in the DOM
        time.value = ''
        monday.checked = tuesday.checked = wednesday.checked = thursday.checked = friday.checked = saturday.checked = sunday.checked = false
        everyday.checked = false
        
        // After storing the new alarm in localStorage, just display it in the DOM
        showAlarms()

        // After setting the new alarm, call setAlarm function
        setAlarm()

        // Reload the page, so that alarms list gets updated in localStorage
        location.reload()
    }
    e.preventDefault()
})

function convertDateTo12hrs(date) {
    // Function to convert time into 12 hours format : input-> any date
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let amPm = 'AM'
    if (hours < 12) {
        amPm = 'AM'
    }
    else {
        amPm = 'PM'
    }
    if (hours == 0) {
        hours = 12
    }
    else if (hours > 12) {
        hours = 12 - (24 - hours)
    }
    if (hours <= 9) {
        hours = `0${hours}`
    }
    if (minutes <= 9) {
        minutes = `0${minutes}`
    }
    if (seconds <= 9) {
        seconds = `0${seconds}`
    }
    return `${hours}:${minutes}:${seconds} ${amPm}`
}

function convert12To24Hrs(time)
{
    let amPm=time.slice(6)
    let hrs=time.slice(0,2)
    if(amPm=='AM')
    {
        if(hrs==12)
        {
            hrs='00'
        }
    }
    else
    {
        if(hrs!=12)
        {
            hrs=Number(hrs)+12
        }
    }

    if(hrs<=9 &hrs>=1)
    {
        hrs=`${hrs}`
    }

    let newTime=`${hrs}:${time.slice(3,5).toString()}`

    return newTime
}

function showAlarms() {
    // Function to show the alarms in the DOM

    let alarms = localStorage.getItem('alarms');
    if (alarms == null) {
        alarmsObj = []
    }
    else {
        alarmsObj = JSON.parse(alarms)
    }

    let html = "";
    alarmsObj.forEach(function (element, index) {
        let time = element.time
        let label=element.label
        let weekdays = element.weekdays
        let daysHtml = ''
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        weekdays.forEach((element, index) => {
            if (element == 1) {
                daysHtml += `<span class="days" style="margin-right:0.6rem;">${days[index]}</span>`
            }

        })

        let tempDate = new Date(`${2000}-${2}-${3} ${time}`)

        let time_formatted12hrs = convertDateTo12hrs(tempDate)

        time_formatted12hrs = time_formatted12hrs.slice(0, 5) + time_formatted12hrs.slice(8)

        html += `<div class="noteCard my-2 mx-2" style="border:2px solid #2b4f34; background-color:#ffe6f2; width:350px">
                    <div class="card-body">
                        <h5 class="card-title">${time_formatted12hrs}</h5>
                        <p class='card-text'>${daysHtml}</p>
                        <p class='card-text'><span style="font-family: 'Courier New', monospace; font-weight:bold;">Label: </span>${label}</p>
                        <button id='${index}' onclick='deleteAlarm(this.id)' class="btn btn-success">Delete alarm</button>
                    </div>
                 </div>`;
    });

    let alarmElement = document.getElementById('alarms')
    if (alarmsObj.length != 0) {
        alarmElement.innerHTML = html;
    }
    else {
        alarmElement.innerHTML = `<b>No alarms in your list</b>`
    }
}

function deleteAlarm(index) {
    //  Function to delete an already set alarm
    let alarms = localStorage.getItem('alarms');
    if (alarms == null) {
        notesObj = [];
    }
    else {
        alarmsObj = JSON.parse(alarms);
    }
    alarmsObj.splice(index, 1); // delete one item from alarmsObj at given index
    localStorage.setItem('alarms', JSON.stringify(alarmsObj))

    // After deleting an alarm, display all the available alarms
    showAlarms();
    // After deleting an alarm, call setAlarm function
    setAlarm()
    // Reload the page, so that alarms list gets updated in localStorage
    location.reload()
}

function setAlarm() {
    // Function to set the alarms
    let alarms = localStorage.getItem('alarms');
    let alarmsObj = JSON.parse(alarms);
    let now = new Date()
    let today = now.getDay()
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let date = now.getDate()

    for (let item of alarmsObj) {
        // To set alarm if there is any , for today
        if (item.weekdays[today] == 1) {
            let alarmDate = new Date(`${year}-${month}-${date} ${item.time}`)
            let now = new Date()
            let mSecondsToAlarm = alarmDate - now
            if (mSecondsToAlarm >= 0) {
                todayAlarms.push(alarmDate.getTime())
                setTimeout(() => {
                    ringAlarmtone()
                }, mSecondsToAlarm)
            }
        }
    }
}

let audio = new Audio('alarmtone.mp3')
function ringAlarmtone() {
    // function to play alert audio

    // 
    let firstUpcoming=document.getElementById('upcoming0')
    let firstTime=document.getElementById('time0')
    if(firstUpcoming!=null)
    {
        // To Update the card containing first upcoming alarm which is going to ring
        firstUpcoming.innerText='Ringing...'
        let now=new Date()
        let displayTime=convertDateTo12hrs(now)
        displayTime=`${displayTime.slice(0,5)} ${displayTime.slice(9)}`
        firstTime.innerHTML=`<span style="font-family: 'Courier New', monospace; font-weight:bold; font-size: 1.7rem;">${displayTime}</span>`
    } 

    setTimeout(() => {
        audio.play()
    }, 1000);
    setTimeout(() => {
        audio.play()
    }, 3000);

    setTimeout(() => {
        audio.play()
    }, 5000);

    setTimeout(() => {
        audio.play()
        location.reload()
    }, 8000);
}

function updateUpcomingAlarmsInDOM() {
    // function to display upcoming alarms in the upcomingAlarms div in the DOM
    let upcomingAlarmsdiv = document.getElementById("upcomingAlarms")
    let now = new Date()

    let alarms = localStorage.getItem('alarms');
    let n;
    if (alarms == null) {
        alarmsObj = []
    }
    else {
        alarmsObj = JSON.parse(alarms)
        n=alarmsObj.length
    }
    
    let sortedTodayAlarms = todayAlarms.sort()
    let html = ''
    let count=0;
    for (let time of sortedTodayAlarms) {
        // All the alarms within next 10secs to 1 hour time
        let milliSecs = time - now.getTime()
        if (milliSecs > 10000 && milliSecs <= 3600000) {
            let fulldate = new Date(time)
            let date12hrsformat = convertDateTo12hrs(fulldate)
            date12hrsformat = date12hrsformat.slice(0, 5) + date12hrsformat.slice(8)
            let time24hrs=convert12To24Hrs(date12hrsformat)
            let label;
            // Search in alarms object(got from local storage)
            for(let i=0;i<n;i++)
            {
                if(time24hrs==alarmsObj[i].time)
                {
                    label=alarmsObj[i].label
                    break;
                }
            }

            html += `<div class="noteCard my-2 mx-2" style="border:2px solid #2b4f34; background-color:#ffe6f2; width:255px">
                    <div class="card-body">
                        <span class="badge bg-info text-dark animated" style="font-size: 1rem;" id="upcoming${count}">Upcoming alarm</span>
                        <p class='card-text' style="margin-top:0.4rem;" id="time${count}">Ringing soon at <span style="font-family: 'Courier New', monospace; font-weight:bold;">${date12hrsformat}</span></p>
                        <p class='card-text'><span style="font-family: 'Courier New', monospace; font-weight:bold;">Label: </span>${label}</p>
                    </div>
                 </div>`;
            count++;
        }

        // Animate the upcoming alarm badge
        setInterval(()=>{
            let els = document.querySelectorAll('.animated');

            els.forEach((el)=> {
              el.className="badge bg-danger animated"
            });
        },1000)
        setInterval(()=>{
            let els = document.querySelectorAll('.animated');

            els.forEach((el)=> {
              el.className="badge bg-info text-dark animated"
            });
        },2000)
    }

    upcomingAlarmsdiv.innerHTML = html;

}

function update() {
    // function to update the upcoming alarms in the DOM
    updateUpcomingAlarmsInDOM()
    setInterval(() => {
        // To reload the page after every 30 minutes
        location.reload()

        // It will refresh the upcoming alarm every 30 minutes in the DOM in upcoming alarms div
        // Upcoming means(All the alarms within next 10secs to 1 hour time from now)
        updateUpcomingAlarmsInDOM()
    }, 1800000)

    // To update current year in the footer
    let copyYr= document.getElementById('copyright-year')
    let dt=new Date()
    copyYr.innerText=dt.getFullYear()
}

setAlarm()

update()



