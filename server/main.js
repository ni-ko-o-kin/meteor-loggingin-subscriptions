import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import Links from '/imports/api/links';

function insertLink(value) {
    Links.insert({ value, createdAt: new Date() });
}

Meteor.startup(() => {
    // If the Links collection is empty, add some data.
    if (Links.find().count() === 0) {
        new Array(30000)
            .fill(0)
            .forEach(() => insertLink(Math.ceil(Math.random() * 100)));
    }
});

Meteor.publish('links.list', function() {
    if (!this.userId) {
        return this.ready();
    }

    return Links.find();
});

if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
        username: 'username',
        password: 'password',
    });
}
