import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { EnhancedEncryption } from '@material-ui/icons';
import { Entry } from '../types';

const HealthCheck: React.FC<{ entry: Entry }> = ({ entry }) => (
  <div>
    <Card>
      <CardHeader
        avatar={
            <EnhancedEncryption />
        }
        title={entry.date}
        subheader={entry.description}
      />
      <CardContent>
        <Typography>{`Diagnosed by ${entry.specialist}`}</Typography>
      </CardContent>
    </Card>
  </div>
);

export default HealthCheck;