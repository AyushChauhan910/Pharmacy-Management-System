import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import {
  Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, TableSortLabel, TablePagination, InputAdornment, Grow, CircularProgress, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const API_URL = 'http://localhost:5000/api/patients';

function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ aadharID: '', name: '', address: '', age: '' });
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const token = localStorage.getItem('token');
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
      setPatients(response.data);
    } catch (error) {
      enqueueSnackbar('Failed to fetch patients', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchPatients();
    setTimeout(() => setLoaded(true), 200);
  }, []);

  const handleOpen = (patient = null) => {
    if (patient) {
      setEditMode(true);
      setForm({ ...patient });
      setSelectedId(patient.aadharID);
    } else {
      setEditMode(false);
      setForm({ aadharID: '', name: '', address: '', age: '' });
      setSelectedId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ aadharID: '', name: '', address: '', age: '' });
    setSelectedId(null);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (editMode) {
        await axios.put(`${API_URL}/${selectedId}`, form, { headers: { Authorization: `Bearer ${token}` } });
        enqueueSnackbar('Patient updated successfully!', { variant: 'success' });
      } else {
        await axios.post(API_URL, form, { headers: { Authorization: `Bearer ${token}` } });
        enqueueSnackbar('Patient added successfully!', { variant: 'success' });
      }
      fetchPatients();
      handleClose();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Operation failed', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (aadharID) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        setLoading(true);
        await axios.delete(`${API_URL}/${aadharID}`, { headers: { Authorization: `Bearer ${token}` } });
        enqueueSnackbar('Patient deleted successfully!', { variant: 'success' });
        fetchPatients();
      } catch (error) {
        enqueueSnackbar('Failed to delete patient', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  // Search, sort, and pagination logic
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

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort(array, comparator) {
    const stabilized = array.map((el, index) => [el, index]);
    stabilized.sort((a, b) => {
      const cmp = comparator(a[0], b[0]);
      if (cmp !== 0) return cmp;
      return a[1] - b[1];
    });
    return stabilized.map((el) => el[0]);
  }

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = stableSort(filtered, getComparator(order, orderBy));
  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Export to CSV
  const exportCSV = () => {
    const header = ['Aadhar ID', 'Name', 'Address', 'Age'];
    const rows = patients.map(p => [p.aadharID, p.name, p.address, p.age]);
    let csv = header.join(',') + '\n';
    rows.forEach(row => {
      csv += row.join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patients.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
      py: { xs: 2, md: 4 },
      px: { xs: 0, md: 2 },
      transition: 'background 0.5s',
    }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1, mb: 3, textAlign: 'center' }}>Patients</Typography>
      <Grow in={loaded} timeout={500}>
        <Paper sx={{ borderRadius: 3, boxShadow: 6, overflowX: 'auto', mb: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ m: 2, transition: '0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.05)' } }} 
            onClick={() => handleOpen()}
            disabled={loading}
          >
            Add Patient
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
            placeholder="Search by name"
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
                  <TableCell sortDirection={orderBy === 'aadharID' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'aadharID'}
                      direction={orderBy === 'aadharID' ? order : 'asc'}
                      onClick={() => handleSort('aadharID')}
                    >Aadhar ID</TableSortLabel>
                  </TableCell>
                  <TableCell sortDirection={orderBy === 'name' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={() => handleSort('name')}
                    >Name</TableSortLabel>
                  </TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell sortDirection={orderBy === 'age' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'age'}
                      direction={orderBy === 'age' ? order : 'asc'}
                      onClick={() => handleSort('age')}
                    >Age</TableSortLabel>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((p) => (
                  <TableRow key={p._id}>
                    <TableCell>{p.aadharID}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.address}</TableCell>
                    <TableCell>{p.age}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpen(p)}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleDelete(p.aadharID)}><DeleteIcon /></IconButton>
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
          <DialogTitle>{editMode ? 'Edit Patient' : 'Add Patient'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Aadhar ID"
              fullWidth
              variant="outlined"
              value={form.aadharID}
              onChange={(e) => setForm({ ...form, aadharID: e.target.value })}
              disabled={editMode}
            />
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Address"
              fullWidth
              variant="outlined"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Age"
              type="number"
              fullWidth
              variant="outlined"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
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

export default PatientPage;
