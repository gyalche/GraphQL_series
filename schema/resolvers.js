import { UserList } from './fake-database.js';
import _ from 'lodash';
const resolvers = {
  Query: {
    //user resolvers
    users(parent, args, context, info) {
      return UserList;
    },
    user(parent, args, context, info) {
      console.log(context.req.header)
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    //Movie resolvers
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const movieName = args.name;
      const findMovie = _.find(MovieList, { name: movieName });
      return findMovie;
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1];
      user.id = lastId + 1;
      console.log(user);
    },

    updateUserName: (parent, args) => {
      const { id, newUserName } = args.input;
      UserList.forEach((user) => {
        if (user.id === id) {
          user?.userName = newUserName;
        }
      });
    },
  },

  UserResult:{
    __resolveType(obj){
      if(obj.user) return  "UserSuccessfullResult";
      if(obj.message) return "UserErrorResult"
    }
  }
};
export default resolvers;
