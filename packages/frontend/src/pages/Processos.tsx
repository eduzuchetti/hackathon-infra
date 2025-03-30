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
  SelectChangeEvent,
  Button
} from '@mui/material';
import { Search as SearchIcon, NavigateBefore, NavigateNext, Add as AddIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '../components/UI/Grid';

const Processos: React.FC = () => {
  // Mock data for the table
  const mockData = [
    { id: '1234567-89.2024.8.13.0702', prazo: '17/03/2025', movimentacao: 'Decisão interlocutória', poloAtivo: 'Réu condenado', poloPassivo: 'Ministério Público', saneamento: 'Aguardando resposta do reu' },
    { id: '9876543-21.2024.8.13.0702', prazo: '20/03/2025', movimentacao: 'Sentença procedente', poloAtivo: 'Consumidor prejudicado', poloPassivo: 'Isabela Santos', saneamento: 'Recurso provido' },
    { id: '1122334-55.2024.8.13.0702', prazo: '01/03/2025', movimentacao: 'Decisão interlocutória', poloAtivo: 'Empresa de Eventos ABC LTDA', poloPassivo: 'Indústria de Calçados LTDA', saneamento: 'Aguardando resposta do reu' },
    { id: '4433221-99.2024.8.13.0702', prazo: '03/04/2025', movimentacao: 'Recurso improvido', poloAtivo: 'Oficial de Registro de Imóveis', poloPassivo: 'Agente público', saneamento: 'Será feito recurso' },
    { id: '2233445-66.2024.8.13.0702', prazo: '30/03/2025', movimentacao: 'Sentença procedente', poloAtivo: 'Banco Cred Fácil S.A.', poloPassivo: 'União Federal', saneamento: 'Pendente de resposta do reu' },
  ];

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handlers for pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
      <Box sx={{ pt: 3, pb: 5 }}>
        {/* Header with title and add button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none' }}
          >
            Adicionar Processo
          </Button>
        </Box>
        
        {/* Search Section */}
        <Paper sx={{ p: 3, mb: 4, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
          <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Busca
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" gutterBottom color="primary" fontWeight="bold">
                Período
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="Inicio"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="Fim"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom color="primary" fontWeight="bold">
                Polo Ativo
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom color="primary" fontWeight="bold">
                Polo Passivo
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        </Paper>
        
        {/* Process List Section */}
        <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
          <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 'bold', mb: 3 }}>
            Lista de Processos
          </Typography>
          
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1B5E20' }}>Número do Processo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1B5E20' }}>Prazo Fatal</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1B5E20' }}>Última Movimentação</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1B5E20' }}>Polo Ativo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1B5E20' }}>Polo Passivo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#1B5E20' }}>Saneamento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockData.map((row) => (
                  <TableRow 
                    key={row.id} 
                    hover 
                    component={RouterLink} 
                    to={`/processos/${row.id}`}
                    sx={{ 
                      textDecoration: 'none',
                      '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell component="th" scope="row">{row.id}</TableCell>
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
                onChange={handleChangeRowsPerPage}
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

export default Processos; 