import React from 'react';

import './user.css';

const users = (props) => (
    <article className="User">
        <h1>{props.name}</h1>
        <div className="Info">
            <div className="Name">{props.id}</div>
        </div>
    </article>
);

export default users;