import db from '../models';
import {users} from '../seeders/users';
import {projects} from '../seeders/projects';
import {assignments} from '../seeders/assignments';

export const createUsers = () => {
    users.map(user => {
        db.User.create(user);
    })
}

export const createProject = () => {
    projects.map(project => {
        db.Project.create(project);
    })
}

export const createAssignments = () => {
    assignments.map(assignment => {
        db.ProjectAssignment.create(assignment);
    })
}

interface project {
    id: number;
    title: string;
    status: string;
}
interface user {
    id: string;
    name: string;
    email: string;
    Projects: project []
}

export const getUsers = async (): Promise<user[]> => {
    const userData = await db.User.findAll({
        include: {
            model: db.Project,
            through: {
                attributes: []
            }
        }
    });
    const users = userData.map((user: user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            projects: user.Projects
        }
    })
    return users;
}
// export default {
//  Query: {
    //     me: async(root,args,{db,me},info) => {
//         const user = await db.User.findByPk(me.id);
//         return user;
//     },
//     users: async: (root,args,{db,me},info) => {
//         const users = await db.User.findAll();
//         return users;
//     }
    // },
    // Mutation: {
    //     createUser: async(root,{input},{db}) => {
    //         const {username,email} = input;
    //         const userExists = await db.User.findOne({
    //             where: {
    //                 [Op.or]: [
    //                     {email},
    //                     {username}
    //                 ]
    //             }
    //         })
    //     },
    //     login: async(root,{username,password},{db},info) => {
    //
    //     }
    // }
// }
