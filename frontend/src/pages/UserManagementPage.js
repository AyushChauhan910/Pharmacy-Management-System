import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = 'http://localhost:5000/api/users';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ username: '', name: '', password: '', role: 'user' });
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState('');

  const fetchUsers = () => {
    axios.get(API_URL, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpen = (user = null) => {
    setError('');
    if (user) {
      setEditMode(true);
      setForm({ username: user.username, name: user.name, password: '', role: user.role });
      setSelectedId(user._id);
    } else {
      setEditMode(false);
      setForm({ username: '', name: '', password: '', role: 'user' });
      setSelectedId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ username: '', name: '', password: '', role: 'user' });
    setSelectedId(null);
    setError('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`${API_URL}/${selectedId}`, { name: form.name, role: form.role }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      } else {
        await axios.post(API_URL, form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      }
      fetchUsers();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Error');
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    fetchUsers();
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.role !== 'admin') return <Container><Typography variant="h6">Access denied</Typography></Container>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: 16 }} onClick={() => handleOpen()}>Add User</Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u._id}>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(u)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(u._id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            disabled={editMode}
          />
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          {!editMode && (
            <TextField
              margin="dense"
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
            />
          )}
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={form.role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">{editMode ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default UserManagementPage; 