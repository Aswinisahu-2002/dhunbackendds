const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const swaggerOption = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"My Dhun Api",
            version:"1.0.0",
            description:"API documentation using swagger"
        },
        servers:[
            {
                url:"http://localhost:8080"
            }
        ]
    },
    apis: ["./routes/public_rotes/*.js","./routes/songs_route/*.js","./server*.js"]
}

const swaggerSpec = swaggerJsDoc(swaggerOption)

module.exports = {swaggerUi,swaggerSpec}
