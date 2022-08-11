const { ApolloServer, gql } = require('apollo-server');
import {typeDefs} from './graphql/schema';
import {resolvers} from './graphql/resolvers';
import {createUsers,createProject,createAssignments} from './utils';
import db from '../models';

// createUsers();
// createProject();
// createAssignments();

const server = new ApolloServer({
    typeDefs,resolvers
});

db.sequelize.sync().then(() => {
    server.listen().then(({url}: {url: string}) => {
        console.log(`Server listening on ${url}`);
    });
});

