import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, TableSortLabel, TablePagination, InputAdornment, Grow
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const API_URL = 'http://localhost:5000/api/pharmacies';

function PharmacyPage() {
  const [pharmacies, setPharmacies] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loaded, setLoaded] = useState(false);

  const token = localStorage.getItem('token');
  const fetchPharmacies = () => {
    axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPharmacies(res.data));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchPharmacies();
    setTimeout(() => setLoaded(true), 200);
  }, []);

  const handleOpen = (pharmacy = null) => {
    if (pharmacy) {
      setEditMode(true);
      setForm({ ...pharmacy });
      setSelectedId(pharmacy._id);
    } else {
      setEditMode(false);
      setForm({ name: '', address: '', phone: '' });
      setSelectedId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ name: '', address: '', phone: '' });
    setSelectedId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editMode) {
      await axios.put(`${API_URL}/${selectedId}`, form, { headers: { Authorization: `Bearer ${token}` } });
    } else {
      await axios.post(API_URL, form, { headers: { Authorization: `Bearer ${token}` } });
    }
    fetchPharmacies();
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchPharmacies();
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

  const filtered = pharmacies.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.address.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = stableSort(filtered, getComparator(order, orderBy));
  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Export to CSV
  const exportCSV = () => {
    const header = ['Name', 'Address', 'Phone'];
    const rows = pharmacies.map(p => [p.name, p.address, p.phone]);
    let csv = header.join(',') + '\n';
    rows.forEach(row => {
      csv += row.join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pharmacies.csv';
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
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1, mb: 3, textAlign: 'center' }}>Pharmacies</Typography>
      <Grow in={loaded} timeout={500}>
        <Paper sx={{ borderRadius: 3, boxShadow: 6, overflowX: 'auto', mb: 2 }}>
          <Button variant="contained" color="primary" sx={{ m: 2, transition: '0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.05)' } }} onClick={() => handleOpen()}>Add Pharmacy</Button>
          <Button variant="outlined" color="secondary" sx={{ m: 2, transition: '0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.05)' } }} onClick={exportCSV}>Export CSV</Button>
          <TextField
            placeholder="Search by name"
            value={search}
            onChange={handleSearch}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
            sx={{ m: 2, width: { xs: '100%', sm: 300 } }}
          />
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderBy === 'name' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                  >Name</TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'address' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'address'}
                    direction={orderBy === 'address' ? order : 'asc'}
                    onClick={() => handleSort('address')}
                  >Address</TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'phone' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'phone'}
                    direction={orderBy === 'phone' ? order : 'asc'}
                    onClick={() => handleSort('phone')}
                  >Phone</TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.address}</TableCell>
                  <TableCell>{p.phone}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpen(p)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(p._id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
          <DialogTitle>{editMode ? 'Edit Pharmacy' : 'Add Pharmacy'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">{editMode ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </Dialog>
      </Grow>
    </Container>
  );
}

export default PharmacyPage; 