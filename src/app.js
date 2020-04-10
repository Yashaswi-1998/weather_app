const express=require('express')

const path=require('path')

const hbs=require('hbs')

const getTemp=require('./utils.js')

const set_path=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

const app=express()
const port=process.env.PORT||3000


app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(set_path))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Yashaswi'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Yashaswi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help',
        name:'Yashaswi'

    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
       return res.send({
           error:'Address is necessary'
       })
    }

     
    getTemp(req.query.address,(error,data)=>{
        if(error)
        {
            res.send({
                error
            })
        }
        else
        {
            res.send({
                temp:data.temp,
                humidity:data.humidity,
                address:req.query.address
            })
        }
})
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Yashaswi',
        errorMessage:'Page not found'


    })
})
app.get('*',(req,res)=>{
res.render('404', {
    title:404,
    name:'Yashaswi',
    errorMessage:'404 error'
})
})

app.listen(port,()=>
{
    console.log('server as active at port '+port)
})
