import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

function LoginRegister({ onLoginSuccess }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register state
  const [regLoginName, setRegLoginName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regLocation, setRegLocation] = useState('');
  const [regDescription, setRegDescription] = useState('');
  const [regOccupation, setRegOccupation] = useState('');
  
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
    setLoginError('');
    setRegError('');
    setRegSuccess('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginName || !loginPassword) {
      setLoginError('Please enter both username and password.');
      return;
    }

    fetch('/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login_name: loginName, password: loginPassword }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(errMsg || 'Login failed');
        }
        return res.json();
      })
      .then((userData) => {
        onLoginSuccess(userData);
      })
      .catch((err) => {
        setLoginError(err.message);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!regLoginName || !regPassword || !regConfirmPassword || !regFirstName || !regLastName) {
      setRegError('Please fill in all required fields (Username, Password, First Name, Last Name).');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }

    fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login_name: regLoginName,
        password: regPassword,
        first_name: regFirstName,
        last_name: regLastName,
        location: regLocation,
        description: regDescription,
        occupation: regOccupation,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(errMsg || 'Registration failed');
        }
        return res.json();
      })
      .then((data) => {
        setRegSuccess(`Successfully registered as ${data.login_name}! You can now switch to Login tab to log in.`);
        // Clear all fields
        setRegLoginName('');
        setRegPassword('');
        setRegConfirmPassword('');
        setRegFirstName('');
        setRegLastName('');
        setRegLocation('');
        setRegDescription('');
        setRegOccupation('');
      })
      .catch((err) => {
        setRegError(err.message);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Box>

        {tabIndex === 0 && (
          <Box component="form" onSubmit={handleLogin} noValidate>
            <Typography variant="h5" align="center" gutterBottom>
              Log In
            </Typography>
            {loginError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {loginError}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="loginName"
              autoComplete="username"
              autoFocus
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Log In
            </Button>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box component="form" onSubmit={handleRegister} noValidate>
            <Typography variant="h5" align="center" gutterBottom>
              Register
            </Typography>
            {regError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {regError}
              </Alert>
            )}
            {regSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {regSuccess}
              </Alert>
            )}
            <TextField
              margin="dense"
              required
              fullWidth
              label="Username (Login Name)"
              value={regLoginName}
              onChange={(e) => setRegLoginName(e.target.value)}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              label="Password"
              type="password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              value={regConfirmPassword}
              onChange={(e) => setRegConfirmPassword(e.target.value)}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                margin="dense"
                required
                fullWidth
                label="First Name"
                value={regFirstName}
                onChange={(e) => setRegFirstName(e.target.value)}
              />
              <TextField
                margin="dense"
                required
                fullWidth
                label="Last Name"
                value={regLastName}
                onChange={(e) => setRegLastName(e.target.value)}
              />
            </Box>
            <TextField
              margin="dense"
              fullWidth
              label="Location"
              value={regLocation}
              onChange={(e) => setRegLocation(e.target.value)}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Occupation"
              value={regOccupation}
              onChange={(e) => setRegOccupation(e.target.value)}
            />
            <TextField
              margin="dense"
              fullWidth
              multiline
              rows={2}
              label="Description"
              value={regDescription}
              onChange={(e) => setRegDescription(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Register Me
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default LoginRegister;
