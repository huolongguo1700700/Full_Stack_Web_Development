import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { LocalPharmacy, FavoriteSharp } from '@material-ui/icons';
import { Entry } from '../types';

const OccupationalHealthcare: React.FC<{ entry: Entry }> = ({ entry }) => (
  <div>
    <Card>
      <CardHeader
        avatar={
            <LocalPharmacy />
        }
        title={entry.date}
        subheader={entry.description}
      />
      <CardContent>
        <div>
            <FavoriteSharp style={{ color: 'yellow' }} />
        </div>
        <Typography>{`Diagnosed by ${entry.specialist}`}</Typography>
      </CardContent>
    </Card>
  </div>
);

export default OccupationalHealthcare;