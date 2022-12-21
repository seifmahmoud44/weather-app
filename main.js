











window.addEventListener('load', ()=>{
    input.focus()
})

let input = document.querySelector(".input")
let form = document.querySelector("form")

let weatherContent =document.querySelector(".weather-content")

let message =document.querySelector(".message")
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    if(input.value == ''){
        message.classList.add("active")
        message.textContent = "Please Enter your city"
    }else{
        message.classList.remove("active")
        
        getWeather()
        input.value =''



    }




})


async function getWeather(){
    
    let APIkey = "41f16106583aa951164d8af3f6b76a3b"
    let cityName = input.value
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`
    const res = await fetch(url)
    const data = await res.json()
    const {main, sys} = data
    const icon = `img/weather/`


    if (data.message == 'city not found'){
        message.classList.add("active")
        message.textContent = "Please Enter valid city"
    }else{
        weatherContent.innerHTML += `
        <div class="card">
            <img src="img/weather/${data.weather[0].icon}.svg" class="icon">
            <div class="tempall">
                <h1 class="temp">${(data.main.temp-273).toFixed(0)}<sup class="c">&deg;C</sup></h1>
                <p class="switch">F</p>
            </div>
            <p class="des">${data.weather[0].description}</p>
            <p class="local">${data.name}<span>${data.sys.country}</span></p>
        </div>
        `
    }

    let cards =weatherContent.getElementsByClassName("card")



    for (let i =0; i < cards.length; i++){
        let card = cards[i]
        let tempContainer = card.getElementsByClassName("tempall")[0]
        tempContainer.addEventListener('click', ()=>{
            let temp = tempContainer.getElementsByClassName("temp")[0]
            let deg = tempContainer.getElementsByClassName("switch")[0]
            if (deg.innerHTML == 'F'){
                console.log(temp);
                let fNum = +temp.textContent.replace('°C','')
                temp.innerHTML = `${(fNum * 9/5 + 32).toFixed(0)}<sup class="c">&deg;F</sup>`
                deg.innerHTML = 'C' 
            }else{
                let fNum = +temp.textContent.replace('°F','')
                temp.innerHTML = `${((fNum  - 32) * 5/9).toFixed(0)}<sup class="c">&deg;C</sup>`
                deg.innerHTML = 'F' 
                console.log(fNum);

            }
        })
    }

} 
