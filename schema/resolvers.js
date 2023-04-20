import { UserList } from './fake-database.js';
import _ from 'lodash';
const resolvers = {
  Query: {
    //user resolvers
    users() {
      return UserList;
    },
    user(parens, args) {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },
    
    //Movie resolvers
    movies: () => {
      return MovieList;
    },
    movie: (parents, args) => {
      const movieName = args.name;
      const findMovie = _.find(MovieList, { name: movieName });
      return findMovie;
    },
  },

  Mutation: {
    createUser: (parents, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1];
      user.id = lastId + 1;
      console.log(user);
    },

    updateUserName: (parents, args) => {
      const { id, newUserName } = args.input;
      UserList.forEach((user) => {
        if (user.id === id) {
          user.userName = newUserName;
        }
      });
    },
  },
};
export default resolvers;
