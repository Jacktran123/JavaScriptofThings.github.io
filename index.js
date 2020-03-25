window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription=document.querySelector('.temperature-description');
    let temperatureDegree=document.querySelector('.temperature-degree');
    let locationTimezone=document.querySelector('.location-timezone');
    let temperatureSection=document.querySelector('.temperature')
    const temperatureSpan=document.querySelector('.temperature span')

    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position=>{
           long=position.coords.longitude;
           lat=position.coords.latitude;
           
           const proxy='https://cors-anywhere.herokuapp.com/';
           const api=`${proxy}https://api.darksky.net/forecast/7b156d8670eedc8894ee8c9328ecb8a1/${lat},${long}`

           fetch(api)
            .then(res=> res.json())
            .then(data=> {
                console.log(data); 
                const {temperature, summary, icon} = data.currently; 
                //Set Dom Elements from the API

                temperatureDegree.textContent=`${temperature}`;
                temperatureSpan.textContent=`F`;
                temperatureDescription.textContent=summary;
                locationTimezone.textContent=data.timezone; 

                //Set icon
                setIcon(icon,document.querySelector('.icon1'));
                TemperatureChange(temperature);

                //change temperature to Celcius
                function TemperatureChange(temperature){
                    temperatureSection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent.includes("F")){
                         temperatureSpan.textContent="C"
                          temperatureDegree.textContent=Math.round((temperature - 32) * 5/9)
                        }  else {
                         temperatureSpan.textContent="F"
                         temperatureDegree.textContent=temperature
                }})
                     }
                   })
                .catch(error=>console.error(error))
              })
    }
      
    

    function setIcon(icon, iconID){
      const skycons= new Skycons({color: 'white'});
      const currentIcon= icon.replace(/-/g,"_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon])
    };

  
  

});