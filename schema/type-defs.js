import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovie: [Movie]
  }
  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }
  type Query {
    users: [User!]!
    user(id: ID): User
    movies: [Movie!]!
    movie(name: String): Movie!
  }
  input createInputUser {
    name: String!
    usernames: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovie: [Movie]
  }
  input updateUserName {
    id: ID!
    newUserName: String!
  }
  type Mutation {
    createUser(input: createInputUser!): User!
    updateUserName(input: updateUserName!): User!
  }
  enum Nationality {
    USA
    CANADA
    AUSTRALIA
  }
`;
export default typeDefs;
