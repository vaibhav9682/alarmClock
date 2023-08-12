document.addEventListener("DOMContentLoaded", () => {

    var date = new Date()
    var Mhour = date.getHours();
    var Mminute = date.getMinutes();
    var Msecond = date.getSeconds()
    var timestamp = date.toLocaleTimeString('en-US');
    var meridian = timestamp.slice(-2);
    var alarmArr = []

    // input fields
    var hourInput = document.getElementById("hour")
    var minuteInput = document.getElementById("minute")
    var secondInput = document.getElementById("second")
    var meridiemInput = document.getElementById("meridiem")


    var setHour = document.getElementById("setHour")
    var setMinute = document.getElementById("setMinute")
    var setSecond = document.getElementById("setSecond")
    var setMeridiem = document.getElementById("setMeridiem");

    var setBtn = document.getElementById("btnAlarm")

    var alarmList = document.getElementById("alarmList")

    hourInput.innerText = Mhour;
    minuteInput.innerText = Mminute;
    secondInput.innerText = Msecond;
    meridiemInput.innerText = meridian


    function alertFun() {
        alert(`alarm for ${Mhour}:${Mminute}:${Msecond}`)
    }

    var interval = setInterval(() => {


        Msecond = Msecond + 1

        if (Msecond == 60) {
            Msecond = 0;
            Mminute = Mminute + 1;
            if (Mminute == 60) {
                Mminute = 0;
                Mhour = Mhour + 1;

            }
            minuteInput.innerText = Mminute;

        }
        if (Mhour > 11) {
            Mhour = Mhour - 12;
        }
        secondInput.innerText = Msecond;
        hourInput.innerText = Mhour;

        for (alarm of alarmArr) {
            if (alarm.hour == Mhour && alarm.min == Mminute && alarm.sec == Msecond && alarm.meri == meridian) {
                alertFun()

            }
        }


    }, 1000)




    setBtn.addEventListener("click", () => {

        // console.log(new Date().getTime())

        if (setHour.value != "" && setHour.value < 12 && setMinute.value != "" && setSecond.value != "" && setMeridiem.value != "--") {
            var obj = {};
            obj.hour = setHour.value;
            obj.min = setMinute.value;
            obj.sec = setSecond.value;
            obj.meri = setMeridiem.value;
            obj.id = Date.now();
            alarmArr.push(obj);
            console.log(alarmArr)
            renderList();


        } else {
            alert(`Please inter valid time values. 
All the fields are mendatory.
use 12 hour format only.`)
        }
        setHour.value = ""
        setMinute.value = ""
        setSecond.value = ""
    })



    var renderList = () => {

        alarmList.innerHTML = "";

        for (let i = 0; i < alarmArr.length; i++) {
            let list = document.createElement('li');
            let btnDel = document.createElement('button');
            let listDiv = document.createElement('div')
            btnDel.setAttribute('class', alarmArr[i].id)
            list.innerText = `Time : ${alarmArr[i].hour}:${alarmArr[i].min}:${alarmArr[i].sec} ${alarmArr[i].meri}`

            btnDel.innerText = "X"

            listDiv.append(list, btnDel)
            alarmList.append(listDiv)

            btnDel.onclick = function () {
                var delId = btnDel.getAttribute("class")
                for (let m = 0; m < alarmArr.length; m++) {
                    if (alarmArr[m].id == delId) {
                        alarmArr.splice(m, 1)
                    }
                }
                renderList()


            }
        }

    }






})