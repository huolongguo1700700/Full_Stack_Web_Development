import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { LocalHospital, FavoriteSharp } from '@material-ui/icons';
import { Entry } from '../types';

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => (
  <div>
    <Card>
      <CardHeader
        avatar={
            <LocalHospital />
        }
        title={entry.date}
        subheader={entry.description}
      />
      <CardContent>
        <div>
            <FavoriteSharp style={{ color: 'green' }} />
        </div>
        <Typography>{`Diagnosed by ${entry.specialist}`}</Typography>
      </CardContent>
    </Card>
  </div>
);

export default HospitalEntry;