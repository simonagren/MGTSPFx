import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import AppContext from '../common/AppContext';

const HelloUser: React.FunctionComponent = () => {

    const [name, setName] = useState('');
    const { service } = useContext(AppContext);

    useEffect(() => {
        service.getMe().then(user => {
            setName(user.displayName);
        });
    });

    return (
        <div>
            {name &&
                <span>Hello {name}</span>
            }
        </div>

    );
};

export default HelloUser;