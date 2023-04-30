import React, { useState } from 'react';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';

const QUERY_ALL_USERS = gql`
    query GetAllUsers{
        users:{
            id
            name
            age
            username
            nationality
        }
    }
`;

// query user{
//   ...GetAgeAndName
// }

// fragment GetAgeAndName on User{

//   name, age
// }
const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    name
  }
`;
const FETCH_MOVIEBY_NAME = gql`
  query GetMovieByName($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

type User = {
  name: String;
  userName: String;
  age: number;
  Nationality: String;
};

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DisplayData = () => {
  const [movieName, setMovieName] = useState('');
  const [user, setUser] = useState({
    name: '',
    userName: '',
    age: '',
    Nationality: '',
  });
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const [fetchMovie, { data: movieSearchData, error: movieError }] =
    useLazyQuery(QUERY_ALL_MOVIES);

  if (data) console.log('mydata', data);
  if (loading) {
    <h1>Data is loading...</h1>;
  }
  if (error) {
    <h3>error</h3>;
  }

  const {
    data: movieData,
    loading: movieLoading,
    error: movieErrors,
  } = useQuery(QUERY_ALL_MOVIES);

  const changeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser((user) => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Name.."
        onChange={changeUser}
      />
      <input
        type="text"
        name="userName"
        placeholder="userName.."
        onChange={changeUser}
      />
      <input
        type="number"
        name="age"
        placeholder="age.."
        onChange={changeUser}
      />
      <input
        type="text"
        name="Nationality"
        placeholder="Nationality.."
        onChange={changeUser}
      />
      <button onClick={() => createUser({ variables: { input: user } })}>
        Create User
      </button>
      <div>
        {data &&
          data?.users?.map((data: any) => (
            <div>
              <h1>Name:{data?.name}</h1>
              <h1>UserName:{data?.userName}</h1>
              <h1>Name:{data?.age}</h1>
            </div>
          ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="write movie id"
          onChange={(e) => setMovieName(e.target.value)}
        />
        <button
          onClick={() =>
            fetchMovie({
              variables: {
                name: movieName,
              },
            })
          }>
          Fetch Data
        </button>
      </div>
    </>
  );
};
export default DisplayData;
