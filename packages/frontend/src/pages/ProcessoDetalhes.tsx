import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Breadcrumbs,
  Link,
  Divider,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent
} from '@mui/material';
import {
  Edit as EditIcon,
  NavigateBefore,
  NavigateNext,
  Close as CloseIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '../components/UI/Grid';

const ProcessoDetalhes: React.FC = () => {
  // Mock data for the documents table
  const mockDocuments = [
    { data: '30/03/2025', status: 'Sentença', arquivo: '9999999', observacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' },
    { data: '30/03/2025', status: 'Impugnação a contestação', arquivo: '8888888', observacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' },
    { data: '30/03/2025', status: 'Contestação', arquivo: '6666666', observacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' },
    { data: '30/03/2025', status: 'Contestação', arquivo: '5555555', observacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' },
    { data: '30/03/2025', status: 'Cópia Integral', arquivo: '4444444', observacao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' },
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
    <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3, pt: 3, pb: 5 }}>
      {/* Breadcrumb navigation */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Typography color="text.primary">Processo_9999</Typography>
      </Breadcrumbs>

      {/* Process header with close button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Processo Nº 99999
        </Typography>
        <IconButton 
          component={RouterLink} 
          to="/processos" 
          sx={{ 
            bgcolor: 'white', 
            boxShadow: 1,
            '&:hover': { bgcolor: 'white' } 
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider sx={{ mb: 3 }} />

      {/* Saneamento button */}
      <Button
        variant="outlined"
        color="primary"
        startIcon={<EditIcon />}
        sx={{ 
          textTransform: 'uppercase', 
          mb: 3,
          borderColor: theme => theme.palette.primary.main,
          color: theme => theme.palette.primary.main,
          '&:hover': {
            borderColor: theme => theme.palette.primary.dark,
            backgroundColor: 'rgba(71, 162, 72, 0.08)'
          }
        }}
      >
        Saneamento
      </Button>

      {/* Process details */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Typography variant="body1" gutterBottom>
            Prazo Final
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, height: '56px', display: 'flex', alignItems: 'center' }} />
        </Grid>
        
        <Grid item xs={12} sm={6} md={2.4}>
          <Typography variant="body1" gutterBottom>
            Ultima Movimentação
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, height: '56px', display: 'flex', alignItems: 'center' }} />
        </Grid>
        
        <Grid item xs={12} sm={6} md={2.4}>
          <Typography variant="body1" gutterBottom>
            Natureza
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, height: '56px', display: 'flex', alignItems: 'center' }} />
        </Grid>
        
        <Grid item xs={12} sm={6} md={2.4}>
          <Typography variant="body1" gutterBottom>
            Juízo
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, height: '56px', display: 'flex', alignItems: 'center' }} />
        </Grid>
        
        <Grid item xs={12} sm={6} md={2.4}>
          <Typography variant="body1" gutterBottom>
            Valor da Causa
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, height: '56px', display: 'flex', alignItems: 'center' }} />
        </Grid>
      </Grid>

      {/* Polo Ativo & Passivo */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom fontWeight="medium">
            Polo Ativo
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Outlined style"
            sx={{ bgcolor: 'background.paper' }}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom fontWeight="medium">
            Polo Passivo
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Outlined style"
            sx={{ bgcolor: 'background.paper' }}
          />
        </Grid>
      </Grid>

      {/* Documents table */}
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'background.paper' }}>
              <TableCell sx={{ color: theme => theme.palette.primary.main, fontWeight: 500 }}>Data de Atualização</TableCell>
              <TableCell sx={{ color: theme => theme.palette.primary.main, fontWeight: 500 }}>Status</TableCell>
              <TableCell sx={{ color: theme => theme.palette.primary.main, fontWeight: 500 }}>Arquivo do Processo</TableCell>
              <TableCell sx={{ color: theme => theme.palette.primary.main, fontWeight: 500 }}>Observação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockDocuments.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.data}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.arquivo}</TableCell>
                <TableCell>{row.observacao}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Rows per page:
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
          1-5 of 10
        </Typography>
        <IconButton size="small" disabled={page === 0}>
          <NavigateBefore />
        </IconButton>
        <IconButton size="small">
          <NavigateNext />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ProcessoDetalhes; 