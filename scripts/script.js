
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicW9ib255b25pIiwiYSI6ImNsOHcwaWRqMDBjOHMzbnFuM3Bhb3pucTAifQ.X4d4LlfBT5xNvCggIVP9UA"

const ipInput = document.querySelector('[data-ip]')

const API_KEY = "at_ZYdOxP2FKkBp62dbGLS9q9uRcOkxQ"

const btn = document.querySelector('.btn')

const fmethod = {method: 'GET'}

let ipO = document.querySelector('[data-ip-out]')
let tzO = document.querySelector('[data-tz-out]')
let locO = document.querySelector('[data-loc-out]')
let ispO = document.querySelector('[data-isp-out]')





navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

function setupMap(centerPosition) {
  const map = new mapboxgl.Map({
    accessToken: MAPBOX_ACCESS_TOKEN,
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: centerPosition,
    zoom: 15
  })
 
    // Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: 'red', rotation: 10 })
.setLngLat(centerPosition)
.addTo(map);


    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-left');

  const directionControls = new MapboxDirections({
    accessToken: MAPBOX_ACCESS_TOKEN
  })
    

}

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
  setupMap([-2.24, 53.48])
}













btn.addEventListener('click', e => {
   
    let ipValue = ipInput.value
    if (ipValue == null || ipValue == '') {
        return alert('Enter IP Address or domain name')
        
    }

    else {

        let IP_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_ZYdOxP2FKkBp62dbGLS9q9uRcOkxQ&` + `domain=${ipValue}`||`ipAddress=${ipValue}`

       getLow(IP_URL)
    }
})

ipInput.addEventListener('keypress', e => {
    if (e.key == 'Enter') {
   
        console.log(ipInput.value)

        let ipValue = ipInput.value
        if (ipValue == null || ipValue == '') {
            return alert('Enter Valid IP Address or domain name')
        
        }

        else {

            let IP_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_ZYdOxP2FKkBp62dbGLS9q9uRcOkxQ&` + `domain=${ipValue}` || `ipAddress=${ipValue}`

            getLow(IP_URL)
        }
    }
    
})




async function getLow(link) {

    try {

        const stuff = await fetch(link, fmethod)
        const data = await stuff.json()
        renderData(data)
                
    }
    catch (error) {
       alert('Error. Check if IP Adddress or Domain is valid ')
      
    } 
}



function renderData(data) {
    setupMap([data.location.lng,data.location.lat])

   
             
        ipO.innerText = data.ip
        tzO.innerText = data.location.timezone
      
        locO.innerText = `${data.location.city} , ${data.location.region}, ${data.location.country}
        `
        ispO.innerText = data.isp
 
   
    }

      



