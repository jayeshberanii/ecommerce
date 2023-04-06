const express=require('express')
const app=express()
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()
const cookie=require('cookie-parser')
const SwaggerUI=require('swagger-ui-express')
const Yaml=require('yamljs')
require('./utils/DBconn')

//Load Swagger.Yaml File
const openApiSpecification=Yaml.load('./Swagger.yaml')
app.use('/api-docs',SwaggerUI.serve,SwaggerUI.setup(openApiSpecification))

app.use(cors())
app.use(cookie())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Routes
app.use('/api/auth',require('./routes/Auth'))
app.use('/api/user',require('./routes/UserRoute'))
app.use('/api/product',require('./routes/ProductRoute'))
app.use('/api/cart',require('./routes/CartRoute'))
app.use('/api/order',require('./routes/OrderRoute'))


const PORT=process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
})