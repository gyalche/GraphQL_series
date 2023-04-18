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
};
export default resolvers;
