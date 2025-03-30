import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper
} from '@mui/material';
import Grid from '../components/UI/Grid';
import { ErrorOutline } from '@mui/icons-material';

const Error500: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh'
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid #e0e0e0',
                borderRadius: 2
              }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: 'error.light',
                  borderRadius: '50%',
                  mb: 3
                }}
              >
                <ErrorOutline sx={{ fontSize: 60, color: 'white' }} />
              </Box>
              
              <Typography variant="h1" component="h1" align="center" sx={{ mb: 2, fontSize: 96 }}>
                500
              </Typography>
              
              <Typography variant="h4" component="h2" align="center" sx={{ mb: 2 }}>
                Erro no Servidor
              </Typography>
              
              <Typography variant="body1" align="center" sx={{ mb: 4, maxWidth: 600 }}>
                Desculpe, ocorreu um erro interno no servidor. Nossa equipe técnica foi notificada e 
                estamos trabalhando para resolver o problema o mais rápido possível.
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Button
                  component={RouterLink}
                  to="/"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Voltar para a Página Inicial
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Error500; 