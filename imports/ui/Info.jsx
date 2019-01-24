import React, { Component } from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Links from '../api/links';

class Info extends Component {
    render() {
        const { subsLoading, loggingIn, numberOfLinks } = this.props;

        if (loggingIn) {
            return <div>logging in</div>;
        }

        if (subsLoading) {
            return <div>subs loading</div>;
        }

        return (
            <div>
                <h1>number of links: {numberOfLinks}</h1>
            </div>
        );
    }
}

export default (InfoContainer = withTracker(() => {
    const sub = Meteor.subscribe('links.list');

    console.log(sub.ready(), Meteor.loggingIn());

    return {
        subsLoading: !sub.ready(),
        loggingIn: Meteor.loggingIn(),
        numberOfLinks: Links.find().count(),
    };
})(Info));
