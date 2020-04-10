request=require('request')




const getCor=(address,callback)=>
{   const urlcor='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieWFzaGFzd2kxOTk4IiwiYSI6ImNrOHIzZm14cjAzaHUzZnMwN3ZhNWI0MmQifQ.RWPkanLAl1vAeSgrG4nEtQ'
    request({url:urlcor,json:true},(error,response)=>
    {
        if(error)
        {
            callback('error',undefined)
        }
        else if(response.body.features.length===0)
        { 
            callback('location not found',undefined)
        }

        else
        {
            data={
                lat:response.body.features[0].center[1],
                lon:response.body.features[0].center[0]
            }

           // console.log(data)
            callback(undefined,data)
        }
    })
}


const getTemp=(address,callback)=>
{ 
    
     getCor(address,(error,data)=>{
        
       // console.log(data)
        if(data!==undefined)
    {
      
        const url='https://api.openweathermap.org/data/2.5/weather?lat='+data.lat+'&lon='+ data.lon +'&appid=ad535124346d599544cbbaf32e445f59'
        request({url:url,json:true},(error,response)=>{
            if(error)
            {
                callback('error',undefined)
            }
            else if(response.body.error)
            {
                callback('invalid location',undefined)
            }
            else{
                data={
                    temp:(response.body.main.temp-273.15),
                    humidity:response.body.main.humidity
                }
                callback(undefined,data)
            }

        })
    }
    else
    {
        callback(error,undefined)
    }
   
    })
    
 
}




module.exports= getTemp