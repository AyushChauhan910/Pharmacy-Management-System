import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = 'http://localhost:5000/api/pharmacies';

function PharmacyPage() {
  const [pharmacies, setPharmacies] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  const [selectedId, setSelectedId] = useState(null);

  const fetchPharmacies = () => {
    axios.get(API_URL).then(res => setPharmacies(res.data));
  };

  useEffect(() => {
    fetchPharmacies();
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
      await axios.put(`${API_URL}/${selectedId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    fetchPharmacies();
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchPharmacies();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Pharmacies</Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: 16 }} onClick={() => handleOpen()}>Add Pharmacy</Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pharmacies.map((p) => (
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
      </Paper>
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
    </Container>
  );
}

export default PharmacyPage; 