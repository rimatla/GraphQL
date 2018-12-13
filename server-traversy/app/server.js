const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema.js')

const app = express()

// entry point for graphQL 
app.use('/mygraphql', expressGraphQL({
  schema:schema,
  graphiql: true // enables IDE
}))

app.listen(4000, () => {
console.log('Running on port 4000')
})

