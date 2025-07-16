import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = 'http://localhost:5000/api/doctors';

function DoctorPage() {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ aadharID: '', name: '', specialty: '', experience: '' });
  const [selectedId, setSelectedId] = useState(null);

  const token = localStorage.getItem('token');
  const fetchDoctors = () => {
    axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setDoctors(res.data));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleOpen = (doctor = null) => {
    if (doctor) {
      setEditMode(true);
      setForm({ ...doctor });
      setSelectedId(doctor.aadharID);
    } else {
      setEditMode(false);
      setForm({ aadharID: '', name: '', specialty: '', experience: '' });
      setSelectedId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ aadharID: '', name: '', specialty: '', experience: '' });
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
    fetchDoctors();
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchDoctors();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Doctors</Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: 16 }} onClick={() => handleOpen()}>Add Doctor</Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Aadhar ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Specialty</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((d) => (
              <TableRow key={d._id}>
                <TableCell>{d.aadharID}</TableCell>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.specialty}</TableCell>
                <TableCell>{d.experience}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(d)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(d.aadharID)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Doctor' : 'Add Doctor'}</DialogTitle>
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
            label="Specialty"
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Experience"
            name="experience"
            value={form.experience}
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

export default DoctorPage; 