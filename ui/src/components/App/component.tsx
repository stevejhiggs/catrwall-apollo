import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import './styles.scss';
import CatGrid from '../CatGrid/component';

const GET_CATS = gql`
{
  cats {
    id,
    imageUrl,
    votes
  }
}
`;

const VOTE_CAT = gql`
  mutation voteForCat($id:String!){
    voteForCat(id: $id) {
      id,
      votes,
      imageUrl
    }
  }
`;

const App: React.SFC = () =>
  <Query query={GET_CATS} pollInterval={500}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return <div>
        <h3>All the cats...but which is best?</h3>
        <div>(click to vote)</div>
        <img id="crown" src="/crown.png" alt="crown" />
        <Mutation mutation={VOTE_CAT}>
          {(voteForCat, {}) => (
            <CatGrid kittys={data.cats} onKittyClick={id => { voteForCat({variables: {id}}); }} />
          )}
        </Mutation>
      </div>
    }}
  </Query>

export default App;
