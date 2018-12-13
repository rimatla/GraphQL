const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

// hardcoded data
const customers = [
  { id: '1', name: 'Sand Box', email: 'sandy@gmail.com', age: 32 },
  { id: '2', name: 'Boom Box', email: 'boomy@gmail.com', age: 33 },
  { id: '3', name: 'Mail Box', email: 'maily@gmail.com', age: 36 }
]

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

// bassline for all other queries
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      //fetch instructuons
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        // resolve our response
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id == args.id) {
            return customers[i]
          }
        }
      }
    },

    // get all customers
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return customers
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
