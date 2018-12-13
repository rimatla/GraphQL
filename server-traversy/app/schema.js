const axios = require('axios')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull // make it required
} = require('graphql')


// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    about: {type: AboutType},
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

// About Type
const AboutType = new GraphQLObjectType({
  name: 'About',
  fields: () => ({
    power: { type: GraphQLString },
    planet: { type: GraphQLString }
  })
})

// bassline for all other queries 
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // get customer 
    customer: {
      type: CustomerType,
      //fetch instructuons
      args: {
        id: {type: GraphQLString}
      },
      resolve(parentValue, args) {
      return axios
        .get(`http://localhost:3000/customers/${args.id}`)
        .then(res => res.data)
      }
    },

    // get all customers
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios
          .get('http://localhost:3000/customers')
          .then(res => res.data)
      }
    }
  }
})

// add, edit and delete through mutations 
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add customer
    addCustomer: {
      type: CustomerType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, args) {
        return axios
          .post('http://localhost:3000/customers', {
            name: args.name,
            email: args.email,
            age: args.age
          })
          .then(res => res.data)
      }
    },

    // delete customer
    deleteCustomer: {
      type: CustomerType,
      args: {
        // which one to delete
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, args) {
        return axios
          .delete(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data)
      }
    },

    // edit customer
    editCustomer: {
      type: CustomerType,
      args: {
        // only require id ie:GraphQLNonNull
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve(parentValue, args) {
        return axios
          .patch(`http://localhost:3000/customers/${args.id}`, args) // pass all args
          .then(res => res.data)
      }
    }
  }
})

// project Schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation, // ES6
})


