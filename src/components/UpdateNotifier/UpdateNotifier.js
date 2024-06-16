import React, { useState, useEffect } from 'react';

const UpdateNotifier = ({ lastUpdate }) => {
    return (
        <div className="update-notifier">
            <p>Last update: {new Date(lastUpdate).toLocaleTimeString()}</p>
        </div>
    );
};

export default UpdateNotifier;
