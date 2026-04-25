var btn_submit = document.getElementById("btn_submit")
var signup_submit = document.getElementById("signup_submit")
var button_lock = document.getElementById("lock")
var button_unlock = document.getElementById("unlock")
var button_search = document.getElementById("button_emp_search")
var guset_submit = document.getElementById("guest_submit")


if(btn_submit){
    btn_submit.addEventListener('click', login)
}

if(signup_submit){
    signup_submit.addEventListener('click', signup)
}

if (window.location.href == "file:///C:/Users/cwitstudent/OneDrive%20-%20Vocational%20Training%20Council%20-%20Student/(ITP4460)System%20Administration%20and%20IoT%20Project/Mini-Project/soruce_code/control_panel.html"){
    getEmp_list()
}

if(button_lock){
    button_lock.addEventListener('click',lockerLock)
}

if(button_unlock){
    unlock.addEventListener("click", lockerUnLock)
}

if(button_search){
    button_search.addEventListener('click', emp_search)
}

if(guset_submit){
    guset_submit.addEventListener('click', guest_access)
}

if(location.href == "file:///C:/Users/cwitstudent/Vocational%20Training%20Council%20-%20Student/CHUNG%20Tsz%20Kin%20(220282255)%20-%20soruce_code/guest_unlock_okay.html"){
    access_success()
}

async function login() {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emp_id:Number(document.getElementById("login_emp_id").value),
            password:document.getElementById("login_password").value
        })
    }
    try{
        const response = await fetch("https://iot-project-api.to-po-chun.repl.co/emp/login",requestOptions)

        if (!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json()
        const matching_status = data.match

        console.log(data)
        console.log(Number(document.getElementById("login_emp_id").value))
        console.log(document.getElementById("login_password").value)

        if(matching_status == false){
            alert("Wrong ID or wrong password")
        }
        else if(matching_status == true){
            sessionStorage.setItem("user_id", Number(document.getElementById("login_emp_id").value))
            sessionStorage.setItem("loc_id", data.loc_id)
            location.replace("file:///C:/Users/cwitstudent/OneDrive%20-%20Vocational%20Training%20Council%20-%20Student/(ITP4460)System%20Administration%20and%20IoT%20Project/Mini-Project/soruce_code/control_panel.html")
        }

    } catch(error){
        console.error("Rhere was an error!", error)
    }
}

async function signup() {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emp_id:Number(document.getElementById("signup_emp_id").value),
            password:document.getElementById("signup_password").value
        })
    }
    try{
        const response = await fetch("https://iot-project-api.to-po-chun.repl.co/emp/signup",requestOptions)

        if (!response.ok){
            throw new Error("Network response was not okay")
        }

        const data = await response.json()

        console.log(data)
        console.log(Number(document.getElementById("login_emp_id").value))
        console.log(document.getElementById("login_password").value)

        if(data.status == 200){
            alert(`Account created sucessfully\nLocker ${data.loc_id} is assigned for you.`)
            location.reload("file:///C:/Users/cwitstudent/OneDrive%20-%20Vocational%20Training%20Council%20-%20Student/(ITP4460)System%20Administration%20and%20IoT%20Project/Mini-Project/soruce_code/login_signUp.html")
            // alert(data.loc_id)
        }
        else if(data.status == 404){
            alert("Employee not found")
        }
        else if(data.status == 500){
            alert("Employee already signed up with locker assigned")
        }

    } catch(error){
        console.error("There was an error!", error)
    }
}

async function getEmp_list(){
    var htmlString = ""
    const loc_id = sessionStorage.getItem("loc_id") 
    const requestOptions = {
        method:'GET'
    }
    try{
        const response = await fetch("https://iot-project-api.to-po-chun.repl.co/emp/list",requestOptions)
        if (!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json()

        for (let i=0; i<data.length; i++){
            htmlString += `<div class="emp"><li class="emp-item" id="${data[i]["name"]}">${data[i]["name"]}</li><button onclick="giveAccess('${data[i]["name"]}')" class="give_access"><i class="fa-regular fa-paper-plane"></i></button></div>`
        }
        document.getElementById("emp_list").innerHTML = htmlString
        document.getElementById("display_loc_num").innerText = `Locker No: ${loc_id}`

    }catch(error){
        console.error("Rhere was an error!", error)
    }
    console.log(window.location.href)
    
}

async function lockerLock(){
    const user_id = sessionStorage.getItem("user_id")
    console.log(user_id)

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emp_id: user_id,
            unlock: false
        })
    }
    try{
        const response = await fetch("https://iot-project-api.to-po-chun.repl.co/emp/openlocker",requestOptions)

        if (!response.ok){
            throw new Error("Network response was not okay")
        }

        const data = await response.json()
        console.log(data)
        if(data.modifiedCount == 1){
            window.alert("You have succcessfully locked the locker!")
        }

    } catch(error){
        console.error("There was an error!", error)
    }
}

async function lockerUnLock(){
    const user_id = sessionStorage.getItem("user_id")
    console.log(user_id)

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emp_id: user_id,
            unlock: true
        })
    }
    try{
        const response = await fetch("https://iot-project-api.to-po-chun.repl.co/emp/openlocker",requestOptions)

        if (!response.ok){
            throw new Error("Network response was not okay")
        }

        const data = await response.json()
        if(data.modifiedCount == 1){
            window.alert("You have succcessfully unlocked the locker!")
        }

    } catch(error){
        console.error("There was an error!", error)
    }
}

async function emp_search(){
    const requestOptions = {
        method:'GET'
    }
    try{
        const response = await fetch("https://iot-project-api.to-po-chun.repl.co/emp/list",requestOptions)
        if (!response.ok){
            throw new Error("Network response was not ok")
        }

        search_input = document.getElementById("emp_search_input").value
        document.getElementById("emp_list").innerHTML = ""

        const data = await response.json()
        console.log(data)
        data.forEach(entry => {
            const name = entry["name"]
            if (search_input.length != 0 && search_input != name)
                return;

            let element = `<div class="emp"><li class="emp-item" id="${name}">${name}</li><button onclick="giveAccess('${name}')" class="give_access"><i class="fa-regular fa-paper-plane"></i></button></div>`
            document.getElementById("emp_list").innerHTML += element
        })

    }catch(error){
        console.error("There was an error!", error)
    }

    return false;
}

async function giveAccess(name){
    console.log(name)
    const sender_id = sessionStorage.getItem("user_id")
    const requestOptions = {
        method:'GET'
    }
    try{
        const response = await fetch("https://iot-project-api.to-po-chun.repl.co/emp/list",requestOptions)
        if (!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json()
        for(let i=0; i<data.length; i++){
            if(data[i]["name"] == name){
                var receiver_id = data[i]["id"]
            }
        }
        getAccess(sender_id, receiver_id)
    }catch(error){
        console.error("There was an error!", error)
    }

    return false;
}

async function getAccess(sender_id, receiver_id){
    console.log(sender_id)
    console.log(receiver_id)
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sender_id: Number(sender_id),
            receiver_id: Number(receiver_id),
            comment: ""
        })
    }
    try{
        const response = await fetch("https://iot-project-api.to-po-chun.repl.co/emp/share",requestOptions)

        if (!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json()
        window.alert(`Your otp is ${data.otp}`)
        
    } catch(error){
        console.error("Rhere was an error!", error)
    }
}

async function guest_access() {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            loc_id:Number(document.getElementById("locker_id").value),
            otp:Number(document.getElementById("otp_password").value)
        })

    }
    try{
        const response = await fetch("https://iot-project-api.to-po-chun.repl.co/guest/openlocker",requestOptions)

        if (!response.ok){
            throw new Error("Network response was not okay")
        }

        const data = await response.json()
        const match_status = data.match

        console.log(data)
        console.log(Number(document.getElementById("locker_id").value))
        console.log(document.getElementById("otp_password").value)

        if(match_status == true){
            sessionStorage.setItem("gloc_id",data["find_match"]["locker_id"])
            alert("login successfully!")
            location.replace("file:///C:/Users/cwitstudent/OneDrive%20-%20Vocational%20Training%20Council%20-%20Student/(ITP4460)System%20Administration%20and%20IoT%20Project/Mini-Project/soruce_code/guest_unlock_okay.html")
        }
        else if(match_status == false){
            alert("Your one-time password is wrong!")
            location.reload("file:///C:/Users/cwitstudent/OneDrive%20-%20Vocational%20Training%20Council%20-%20Student/(ITP4460)System%20Administration%20and%20IoT%20Project/Mini-Project/soruce_code/guest_otp_unlock.html")
        }

    } catch(error){
        console.error("There was an error!", error)
    }
}

async function access_success(){
    const gloc_id = sessionStorage.getItem("gloc_id")
    document.getElementById("guest_loc_num").innerText = `Your locker is ${gloc_id}`
}