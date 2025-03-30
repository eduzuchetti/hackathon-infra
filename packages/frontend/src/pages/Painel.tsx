import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent
} from '@mui/material';
import { Search as SearchIcon, NavigateBefore, NavigateNext } from '@mui/icons-material';
import Grid from '../components/UI/Grid';

const Painel: React.FC = () => {
  // Mock data for the table
  const mockData = [
    { id: '9999999', prazo: 'DDMMAA', movimentacao: 'Lorem-ipsum', poloAtivo: 'Lorem-ipsum', poloPassivo: 'Lorem-ipsum', saneamento: 'Lorem-ipsum' },
    { id: '7777777', prazo: 'DDMMAA', movimentacao: 'Lorem-ipsum', poloAtivo: 'Lorem-ipsum', poloPassivo: 'Lorem-ipsum', saneamento: 'Lorem-ipsum' },
    { id: '6666666', prazo: 'DDMMAA', movimentacao: 'Lorem-ipsum', poloAtivo: 'Lorem-ipsum', poloPassivo: 'Lorem-ipsum', saneamento: 'Lorem-ipsum' },
    { id: '5555555', prazo: 'DDMMAA', movimentacao: 'Lorem-ipsum', poloAtivo: 'Lorem-ipsum', poloPassivo: 'Lorem-ipsum', saneamento: 'Lorem-ipsum' },
    { id: '4444444', prazo: 'DDMMAA', movimentacao: 'Lorem-ipsum', poloAtivo: 'Lorem-ipsum', poloPassivo: 'Lorem-ipsum', saneamento: 'Lorem-ipsum' },
  ];

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handlers for pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
      <Box sx={{ pt: 3, pb: 5 }}>
        {/* Search Section */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Busca
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }} gutterBottom>
                Número do Projeto
              </Typography>
              <TextField
                fullWidth
                placeholder="Pesquisa"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                size="small"
                sx={{ bgcolor: 'background.paper' }}
              />
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }} gutterBottom>
                Período
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="Inicio"
                    variant="outlined"
                    size="small"
                    sx={{ bgcolor: 'background.paper' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="Fim"
                    variant="outlined"
                    size="small"
                    sx={{ bgcolor: 'background.paper' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }} gutterBottom>
                Polo Ativo
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={{ bgcolor: 'background.paper' }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }} gutterBottom>
                Polo Passivo
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={{ bgcolor: 'background.paper' }}
              />
            </Grid>
          </Grid>
        </Paper>
        
        {/* Process Management Section */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
            Gestão de Processos
          </Typography>
          
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'medium', color: 'primary.main' }}>Número do Processo</TableCell>
                  <TableCell sx={{ fontWeight: 'medium', color: 'primary.main' }}>Prazo Fatal</TableCell>
                  <TableCell sx={{ fontWeight: 'medium', color: 'primary.main' }}>Última Movimentação</TableCell>
                  <TableCell sx={{ fontWeight: 'medium', color: 'primary.main' }}>Polo Ativo</TableCell>
                  <TableCell sx={{ fontWeight: 'medium', color: 'primary.main' }}>Polo Passivo</TableCell>
                  <TableCell sx={{ fontWeight: 'medium', color: 'primary.main' }}>Saneamento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.prazo}</TableCell>
                    <TableCell>{row.movimentacao}</TableCell>
                    <TableCell>{row.poloAtivo}</TableCell>
                    <TableCell>{row.poloPassivo}</TableCell>
                    <TableCell>{row.saneamento}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Linhas por página:
            </Typography>
            <FormControl variant="standard" sx={{ minWidth: 60, mr: 2 }}>
              <Select
                value={rowsPerPage.toString()}
                onChange={(e: SelectChangeEvent) => handleChangeRowsPerPage({ target: { value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                sx={{ height: 30 }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" sx={{ mr: 2 }}>
              1-5 de 10
            </Typography>
            <IconButton size="small" disabled={page === 0}>
              <NavigateBefore />
            </IconButton>
            <IconButton size="small">
              <NavigateNext />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Painel; 