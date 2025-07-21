import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import {
  Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, TableSortLabel, TablePagination, InputAdornment, Grow, Select, MenuItem, FormControl, InputLabel, CircularProgress, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const API_URL = process.env.REACT_APP_API_URL + '/users';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' });
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('username');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const token = localStorage.getItem('token');
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(response.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch users', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchUsers();
    setTimeout(() => setLoaded(true), 200);
  }, []);

  const handleOpen = (user = null) => {
    if (user) {
      setEditMode(true);
      setForm({ username: user.username, email: user.email, password: '', role: user.role });
      setSelectedId(user._id);
    } else {
      setEditMode(false);
      setForm({ username: '', email: '', password: '', role: 'user' });
      setSelectedId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ username: '', email: '', password: '', role: 'user' });
    setSelectedId(null);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (editMode) {
        await axios.put(`${API_URL}/${selectedId}`, form, { headers: { Authorization: `Bearer ${token}` } });
        enqueueSnackbar('User updated successfully!', { variant: 'success' });
      } else {
        await axios.post(API_URL, form, { headers: { Authorization: `Bearer ${token}` } });
        enqueueSnackbar('User added successfully!', { variant: 'success' });
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      setError(error.response?.data?.message || 'Operation failed');
      enqueueSnackbar(error.response?.data?.message || 'Operation failed', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setLoading(true);
        await axios.delete(`${API_URL}/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
        enqueueSnackbar('User deleted successfully!', { variant: 'success' });
        fetchUsers();
      } catch (error) {
        enqueueSnackbar('Failed to delete user', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportCSV = () => {
    const headers = ['Username', 'Email', 'Role'];
    const csvContent = [
      headers.join(','),
      ...users.map(user => [user.username, user.email, user.role].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = filteredUsers.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (order === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const paginatedUsers = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.role !== 'admin') return <Container><Typography variant="h6">Access denied</Typography></Container>;

  return (
    <Container maxWidth={false} disableGutters sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
      py: { xs: 2, md: 4 },
      px: { xs: 0, md: 2 },
      transition: 'background 0.5s',
    }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1, mb: 3, textAlign: 'center' }}>User Management</Typography>
      <Grow in={loaded} timeout={500}>
        <Paper sx={{ borderRadius: 3, boxShadow: 6, overflowX: 'auto', mb: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ m: 2, transition: '0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.05)' } }} 
            onClick={() => handleOpen()}
            disabled={loading}
          >
            Add User
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            sx={{ m: 2, transition: '0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.05)' } }} 
            onClick={exportCSV}
            disabled={loading}
          >
            Export CSV
          </Button>
          <TextField
            placeholder="Search by username"
            value={search}
            onChange={handleSearch}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
            sx={{ m: 2, width: { xs: '100%', sm: 300 } }}
            disabled={loading}
          />
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'username'}
                      direction={orderBy === 'username' ? order : 'asc'}
                      onClick={() => handleSort('username')}
                    >
                      Username
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'email'}
                      direction={orderBy === 'email' ? order : 'asc'}
                      onClick={() => handleSort('email')}
                    >
                      Email
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'role'}
                      direction={orderBy === 'role' ? order : 'asc'}
                      onClick={() => handleSort('role')}
                    >
                      Role
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(user)} disabled={loading}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(user._id)} disabled={loading}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <TablePagination
            component="div"
            count={sorted.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </Grow>
      <Grow in={open} timeout={400}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editMode ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              fullWidth
              variant="outlined"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              disabled={editMode}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Role</InputLabel>
              <Select
                value={form.role}
                label="Role"
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>Cancel</Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              disabled={loading}
              sx={{ transition: '0.2s', '&:hover': { transform: 'scale(1.05)' } }}
            >
              {loading ? <CircularProgress size={20} /> : (editMode ? 'Update' : 'Add')}
            </Button>
          </DialogActions>
        </Dialog>
      </Grow>
    </Container>
  );
}

export default UserManagementPage; 