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
    { id: '9999999', prazo: '30/03/2025', movimentacao: 'Sentença', poloAtivo: 'Empresa A', poloPassivo: 'Empresa B', saneamento: 'Concluído' },
    { id: '8888888', prazo: '30/03/2025', movimentacao: 'Impugnação', poloAtivo: 'Empresa C', poloPassivo: 'Empresa D', saneamento: 'Pendente' },
    { id: '7777777', prazo: '30/03/2025', movimentacao: 'Contestação', poloAtivo: 'Empresa E', poloPassivo: 'Empresa F', saneamento: 'Concluído' },
    { id: '6666666', prazo: '30/03/2025', movimentacao: 'Despacho', poloAtivo: 'Empresa G', poloPassivo: 'Empresa H', saneamento: 'Pendente' },
    { id: '5555555', prazo: '30/03/2025', movimentacao: 'Perícia', poloAtivo: 'Empresa I', poloPassivo: 'Empresa J', saneamento: 'Concluído' },
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
          <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 'medium' }}>
            Processos
          </Typography>
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
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
            Busca
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                Número do Processo
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
              <Typography variant="body1" gutterBottom>
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
              <Typography variant="body1" gutterBottom>
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
              <Typography variant="body1" gutterBottom>
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
        
        {/* Process List Section */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
            Lista de Processos
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
                      }
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