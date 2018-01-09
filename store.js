/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var knex = require('knex')(require('./knexfile'));
module.exports = {
  addHobby ({ firstName, lastName, hobby }) {
    console.log(`Add user ${firstName} with hobby ${hobby}`);
    return knex('hobbies').insert({
        firstName,
        lastName,
        hobby
    });
  },
    findHobby ({ searchFirstName }) {
        console.log(`searching for ${searchFirstName}`);
        return knex.select('*').from('hobbies').where({firstName: searchFirstName}).then(function(hobbyRows) {
            if (!hobbyRows) {
                console.log('No Hobbies Located');
                return {failMsg: 'no rows found'};
            } else {
            console.log('Found these rows' + JSON.stringify(hobbyRows));
            return {hobbyRows};
        }
        });
    }
    //return knex('user').where({ username })
      //.then(([user]) => {
        //if (!user) return { success: false };
        //console.log('Found this user' + user);
        //return { user };
     // });
  //}
};

