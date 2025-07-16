import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = 'http://localhost:5000/api/drugs';

function DrugPage() {
  const [drugs, setDrugs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ tradeName: '', formula: '', companyName: '' });
  const [selected, setSelected] = useState({ tradeName: '', companyName: '' });

  const token = localStorage.getItem('token');
  const fetchDrugs = () => {
    axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setDrugs(res.data));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchDrugs();
  }, []);

  const handleOpen = (drug = null) => {
    if (drug) {
      setEditMode(true);
      setForm({ ...drug });
      setSelected({ tradeName: drug.tradeName, companyName: drug.companyName });
    } else {
      setEditMode(false);
      setForm({ tradeName: '', formula: '', companyName: '' });
      setSelected({ tradeName: '', companyName: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ tradeName: '', formula: '', companyName: '' });
    setSelected({ tradeName: '', companyName: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editMode) {
      await axios.put(`${API_URL}/${selected.tradeName}/${selected.companyName}`, form, { headers: { Authorization: `Bearer ${token}` } });
    } else {
      await axios.post(API_URL, form, { headers: { Authorization: `Bearer ${token}` } });
    }
    fetchDrugs();
    handleClose();
  };

  const handleDelete = async (tradeName, companyName) => {
    await axios.delete(`${API_URL}/${tradeName}/${companyName}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchDrugs();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Drugs</Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: 16 }} onClick={() => handleOpen()}>Add Drug</Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Trade Name</TableCell>
              <TableCell>Formula</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drugs.map((d) => (
              <TableRow key={d._id}>
                <TableCell>{d.tradeName}</TableCell>
                <TableCell>{d.formula}</TableCell>
                <TableCell>{d.companyName}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(d)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(d.tradeName, d.companyName)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Drug' : 'Add Drug'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Trade Name"
            name="tradeName"
            value={form.tradeName}
            onChange={handleChange}
            fullWidth
            disabled={editMode}
          />
          <TextField
            margin="dense"
            label="Formula"
            name="formula"
            value={form.formula}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Company Name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            fullWidth
            disabled={editMode}
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

export default DrugPage; 