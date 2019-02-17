
document.querySelector(".address-user").addEventListener("change",()=>{
 

})


document.getElementById("contact3-form-btn").addEventListener("click",function(event){

    event.preventDefault();

    let email = document.querySelector(".email-user").value;
    let address = document.querySelector(".address-user").value;
    let phone = document.querySelector(".phone-user").value;
    let item = document.querySelector(".item-user").value;
    let reason = document.querySelector(".reason-user").value;
    

    
    document.querySelector(".email-user").value = "";
    document.querySelector(".address-user").value ="";
    document.querySelector(".phone-user").value= "";
    document.querySelector(".item-user").value = "";
    document.querySelector(".reason-user").value = "";

    

    if(email && address && phone && item && reason){

        document.querySelector(".form-to-hide").style.display = "none";

        document.getElementById("map").style.display = "block";
        document.querySelector(".user-info").style.display = "block";
        let url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${address}&destinations=1125 Colonel By Dr, Ottawa, ON&key=AIzaSyA4vvxV-HP2A8upYTwu7788qGJSKXC-V0s`

        fetch(
            "https://cors-anywhere.herokuapp.com/"+url,{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
                }
            }
        )
        .then((response)=>response.json()) // convert the readableStream to a json object.
        .then((data)=>{
            console.log("data recieved")
            console.log(data)
            let lngLatObject;
            let lngLatObject2;

            let distance;
            let time;

            distance  = data.rows[0].elements[0].distance.text;
            time      = data.rows[0].elements[0].duration.text;
            console.log(time  + " meh ")
            let geolocationUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${data.destination_addresses[0]}&key=AIzaSyA4vvxV-HP2A8upYTwu7788qGJSKXC-V0s
            `
            console.log(geolocationUrl);


            // ADDRESS 1 (DESIGINATION ADDRESS)
            fetch(
                "https://cors-anywhere.herokuapp.com/"+geolocationUrl,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                    }
                }
            )
            .then((response)=>response.json()) // convert the readableStream to a json object.
            .then((data)=>{

                console.log("GEO DATA")
                console.log(data);
                console.log(data.results[0].geometry.location)
                 lngLatObject = data.results[0].geometry.location
              
                
              

            }).catch((err)=>{
           
            })

            let geolocationUrl2 = `https://maps.googleapis.com/maps/api/geocode/json?address=${data.origin_addresses[0]}&key=AIzaSyA4vvxV-HP2A8upYTwu7788qGJSKXC-V0s
            `
            console.log(geolocationUrl2);


            // ADDRESS 2 (HOME ADDRESS)
            fetch(
                "https://cors-anywhere.herokuapp.com/"+geolocationUrl2,{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                    }
                }
            )
            .then((response)=>response.json()) // convert the readableStream to a json object.
            .then((data)=>{

                console.log("GEO DATA FOR ADDRESS 2 ")
                console.log(data);
                console.log(data.results[0].geometry.location)
                lngLatObject2 = data.results[0].geometry.location
              
                
                initMap(lngLatObject,lngLatObject2)
                document.querySelector(".time-estimate").innerHTML += "  " + time;
                document.querySelector(".distance").innerHTML += "  " + distance;


            }).catch((err)=>{
           
            })

            
            

        })
        .catch((err)=>{
           
        })

       
       
    }
});



function initMap(latLngObject,latLngObject2) {
  

    
    let directionsDisplay = new google.maps.DirectionsRenderer();
    let directionsService = new google.maps.DirectionsService();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: latLngObject
  });

  var marker = new google.maps.Marker({
    position: latLngObject,
    map: map,
    title: 'Hello World!'
  });

  directionsDisplay.setMap(map);
 

var request = {
    origin: latLngObject,
    destination: latLngObject2,
    travelMode: "DRIVING"
}

directionsService.route(request,function(result,status){
    console.log(result,status)
    if(status === "OK"){
        directionsDisplay.setDirections(result)
    }
})

  

}







