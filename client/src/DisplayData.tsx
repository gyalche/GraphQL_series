import React, { useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';

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
const DisplayData = () => {
  const [movieName, setMovieName] = useState('');
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);

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
  return (
    <>
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
