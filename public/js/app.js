console.log('client site javascript is loaded')



const weatherForm =document.querySelector('form')
const search=document.querySelector('input')
var messageOne=document.querySelector('#message-1')
var messageTwo=document.querySelector('#message-2')

 weatherForm.addEventListener('submit',(e)=>{
     e.preventDefault()
const location=search.value
messageOne.textContent='Loading..'
messageTwo.textContent=''


fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
            response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=(data.error)
            }
            else{
                messageOne.textContent=( 'Temperature: '+data.temp.toString()+'.c')
                messageTwo.textContent=('Humidity: '+data.humidity.toString()+'%')
                console.log(data.temp.toString()+'.c')
            }
            })
})
console.log(location)
 })