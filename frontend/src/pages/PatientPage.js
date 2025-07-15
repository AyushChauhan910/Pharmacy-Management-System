import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = 'http://localhost:5000/api/patients';

function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ aadharID: '', name: '', address: '', age: '' });
  const [selectedId, setSelectedId] = useState(null);

  const fetchPatients = () => {
    axios.get(API_URL).then(res => setPatients(res.data));
  };

  useEffect(() => {
    fetchPatients();
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editMode) {
      await axios.put(`${API_URL}/${selectedId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    fetchPatients();
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchPatients();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Patients</Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: 16 }} onClick={() => handleOpen()}>Add Patient</Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Aadhar ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((p) => (
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
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Patient' : 'Add Patient'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Aadhar ID"
            name="aadharID"
            value={form.aadharID}
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
            label="Age"
            name="age"
            value={form.age}
            onChange={handleChange}
            type="number"
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

export default PatientPage;
