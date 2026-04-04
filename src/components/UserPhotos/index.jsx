import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';

import './styles.css';
import fetchModel from '../../lib/fetchModelData';
import { AppContext } from '../../App';

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const { setTitle } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    Promise.all([fetchModel(`/user/${userId}`), fetchModel(`/photosOfUser/${userId}`)])
      .then(([userData, photoData]) => {
        setUser(userData);
        setPhotos(photoData);
        setTitle(`Photos of ${userData.first_name} ${userData.last_name}`);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load photos');
        setLoading(false);
      });
  }, [userId, setTitle]);

  if (loading) {
    return <Typography>Loading photos...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography>User not found.</Typography>;
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>
      {photos.length === 0 && <Typography>No photos available.</Typography>}
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 3 }}>
          <CardMedia
            component="img"
            image={`${process.env.PUBLIC_URL}/images/${photo.file_name}`}
            alt={photo.file_name}
          />
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              {new Date(photo.date_time).toLocaleString()}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Comments:
            </Typography>
            <List>
              {(photo.comments || []).map((comment) => (
                <React.Fragment key={comment._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={comment.comment}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {new Date(comment.date_time).toLocaleString()}
                          </Typography>
                          {' — '}
                          <MuiLink component={Link} to={`/users/${comment.user._id}`}>
                            {comment.user.first_name} {comment.user.last_name}
                          </MuiLink>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
