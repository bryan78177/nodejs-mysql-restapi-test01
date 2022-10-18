import express from 'express'
import employeesRoutes from './routes/employees.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api', employeesRoutes)

app.use((req,res,next)=>{//Middleware cuando un endpoint no existe
    res.status(400).json({
        message:'Endpoint not found'
    })
})

export default app;