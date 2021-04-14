window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    let iconcode;
    let iconurl;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
        long= position.coords.longitude;
        lat= position.coords.latitude;
        
        const api= 
        // `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${long}&key=f478d236ff2b49b5a2e8d9bb6e27716d`;
         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9aa2f06de1c8b7138d7f397616fa7c7e`;
        
        fetch(api)

        .then(response =>{
            return response.json();
        })

        .then(data=>{
            console.log(data);
             const {temp} = data.main;
             const {description} = data.weather[0];
             const{country} = data.sys;
             const {name} = data;
             const {icon} = data.weather[0];

            //set DOM elements from API
             temperatureDegree.textContent = Math.round(((temp-273.15) + Number.EPSILON) * 100) / 100;
             temperatureDescription.textContent = description;
             locationTimezone.textContent = name+" / "+country;

             // formula for Fahrenheit
             let tempc = Math.round(((temp-273.15) + Number.EPSILON) * 100) / 100;
                let fahrenheit = (tempc * (9/5))+32;


            //  set icon
             iconcode = icon;
             iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
             $('#wicon').attr('src', iconurl);

        //    change temperature
            temperatureSection.addEventListener('click',() =>{
                if(temperatureSpan.textContent === "C"){
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = Math.floor(fahrenheit);
                }else{
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = tempc;
                }
            });

        });

        });

    }

});