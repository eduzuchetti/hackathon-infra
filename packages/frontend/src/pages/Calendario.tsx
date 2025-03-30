import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  Divider,
  Chip,
  FormHelperText,
  styled
} from '@mui/material';
import {
  NavigateBefore,
  NavigateNext,
  Today as TodayIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import Grid from '../components/UI/Grid';

interface ProcessoEvent {
  id: string;
  date: Date;
  title: string;
  type: 'critico' | 'atencao' | 'sem_risco' | 'conference' | 'holiday';
}

// Custom styled date input
const DateInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    transition: 'box-shadow 0.3s ease-in-out',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover': {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
    },
    '&.Mui-focused': {
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.12)'
    }
  },
  '& .MuiInputBase-input': {
    padding: '12px 14px',
    fontSize: '0.95rem',
  },
  '& .MuiInputAdornment-root': {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.dark
    }
  }
}));

// Custom styled day
const CalendarDay = styled(Box)<{ selected?: boolean }>(({ theme, selected }) => ({
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '50%',
  transition: 'background-color 0.2s',
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  }),
}));

const Calendario: React.FC = () => {
  // State for current date and view
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState<ProcessoEvent[]>([]);
  const [allEvents, setAllEvents] = useState<ProcessoEvent[]>([]);
  const [dateError, setDateError] = useState<string>('');
  
  // Create calendar grid data
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  
  // Get day names
  const dayNames = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  
  // Get current month and year for display
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  // Short month names for display
  const shortMonthNames = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  
  // Initialize mock data
  useEffect(() => {
    const mockEvents: ProcessoEvent[] = [
      { id: '9999', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4), title: 'Processo 9999', type: 'critico' },
      { id: '3333', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9), title: 'Processo 3333', type: 'critico' },
      { id: '3333', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10), title: 'Processo 3333', type: 'atencao' },
      { id: '3333', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 11), title: 'Processo 3333', type: 'sem_risco' },
      { id: '3333', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 12), title: 'Processo 3333', type: 'atencao' },
      { id: '8673', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15), title: 'Processo 8673', type: 'atencao' },
      { id: '1986', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 16), title: 'Processo 1986', type: 'critico' },
      { id: '4444', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 17), title: 'Processo 4444', type: 'atencao' },
      { id: '4445', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15), title: 'Processo 4445', type: 'sem_risco' },
      { id: '2222', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 24), title: 'Processo 2222', type: 'sem_risco' },
      { id: '4561', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 24), title: 'Processo 4561', type: 'atencao' },
      { id: '43562', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 31), title: 'Processo 43562', type: 'critico' },
      { id: 'conf', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7), title: 'Conference', type: 'conference' },
      { id: 'holiday', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 22), title: 'Holiday', type: 'holiday' }
    ];
    
    setAllEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, [currentDate]);
  
  // Generate calendar days
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of month
    const firstDayOfMonth = new Date(year, month, 1);
    // Get last day of month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Get day of week of first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Get days from previous month to fill first week
    const daysFromPrevMonth = firstDayOfWeek;
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = [];
    
    for (let i = 0; i < daysFromPrevMonth; i++) {
      prevMonthDays.unshift(
        new Date(year, month - 1, prevMonth.getDate() - i)
      );
    }
    
    // Get days from current month
    const currentMonthDays = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      currentMonthDays.push(new Date(year, month, i));
    }
    
    // Get days from next month to fill last week
    const nextMonthDays = [];
    const totalDaysDisplayed = 42; // 6 weeks * 7 days
    const remainingDays = totalDaysDisplayed - (prevMonthDays.length + currentMonthDays.length);
    
    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push(new Date(year, month + 1, i));
    }
    
    // Combine all days
    setCalendarDays([...prevMonthDays, ...currentMonthDays, ...nextMonthDays]);
  }, [currentDate]);
  
  // Validate dates
  const validateDates = (): boolean => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end < start) {
        setDateError('A data final não pode ser anterior à data inicial');
        return false;
      }
    }
    
    setDateError('');
    return true;
  };
  
  // Handle start date change
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    if (endDate) {
      setTimeout(validateDates, 0);
    }
  };
  
  // Handle end date change
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    if (startDate) {
      setTimeout(validateDates, 0);
    }
  };
  
  // Apply date filters
  const applyDateFilter = () => {
    if (!validateDates()) {
      return;
    }
    
    if (!startDate && !endDate) {
      setFilteredEvents(allEvents);
      return;
    }
    
    const filtered = allEvents.filter(event => {
      const eventDate = event.date;
      let isValid = true;
      
      if (startDate) {
        const startDateTime = new Date(startDate).setHours(0, 0, 0, 0);
        isValid = isValid && eventDate.getTime() >= startDateTime;
      }
      
      if (endDate) {
        const endDateTime = new Date(endDate).setHours(23, 59, 59, 999);
        isValid = isValid && eventDate.getTime() <= endDateTime;
      }
      
      return isValid;
    });
    
    setFilteredEvents(filtered);
  };
  
  // Reset filters
  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
    setDateError('');
    setFilteredEvents(allEvents);
  };
  
  // Filter events for a specific day
  const getEventsForDay = (day: Date): ProcessoEvent[] => {
    return filteredEvents.filter(event => 
      event.date.getDate() === day.getDate() && 
      event.date.getMonth() === day.getMonth() && 
      event.date.getFullYear() === day.getFullYear()
    );
  };
  
  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Check if a date is in the current month
  const isCurrentMonth = (day: Date): boolean => {
    return day.getMonth() === currentDate.getMonth();
  };
  
  // Check if a day is selected by date range
  const isDaySelected = (day: Date): boolean => {
    if (!startDate && !endDate) return false;
    
    const dayTime = day.getTime();
    const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
    const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;
    
    if (start && end) {
      return dayTime >= start && dayTime <= end;
    } else if (start) {
      return dayTime === start;
    } else if (end) {
      return dayTime === end;
    }
    
    return false;
  };
  
  // Get event chip color based on type
  const getEventColor = (eventType: string): string => {
    switch (eventType) {
      case 'critico':
        return '#F44336'; // Red
      case 'atencao':
        return '#FF9800'; // Orange
      case 'sem_risco':
        return '#4CAF50'; // Green
      case 'conference':
        return '#7E57C2'; // Purple
      case 'holiday':
        return '#FF9800'; // Orange
      default:
        return '#2196F3'; // Blue
    }
  };
  
  // Format date label for day cell (for first day of month or other month days)
  const formatDayLabel = (day: Date): string => {
    // If it's the first day of the month or a day from another month, show month name
    if (day.getDate() === 1 || day.getMonth() !== currentDate.getMonth()) {
      return `${shortMonthNames[day.getMonth()]} ${day.getDate()}`;
    }
    return day.getDate().toString();
  };
  
  // Format event title to show process numbers
  const formatEventTitle = (event: ProcessoEvent): string => {
    if (event.type === 'conference') return 'Conference';
    if (event.type === 'holiday') return 'Holiday';
    return `Processo ${event.id}`;
  };
  
  // Get full month and year string
  const getFullMonthYear = (): string => {
    return `${monthNames[currentDate.getMonth()].toUpperCase()} ${currentDate.getFullYear()}`;
  };
  
  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
      <Box sx={{ pt: 3, pb: 5 }}>
        <Typography variant="h4" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
          Calendário
        </Typography>
        
        {/* Date Filters */}
        <Paper sx={{ p: 3, mb: 4, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
          <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Período
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <DateInput
                fullWidth
                placeholder="Inicio"
                type="date"
                variant="outlined"
                size="small"
                value={startDate}
                onChange={handleStartDateChange}
                InputLabelProps={{ shrink: true }}
                error={!!dateError}
                InputProps={{
                  sx: { borderRadius: 2 },
                  endAdornment: (
                    <CalendarIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DateInput
                fullWidth
                placeholder="Fim"
                type="date"
                variant="outlined"
                size="small"
                value={endDate}
                onChange={handleEndDateChange}
                InputLabelProps={{ shrink: true }}
                error={!!dateError}
                InputProps={{
                  sx: { borderRadius: 2 },
                  endAdornment: (
                    <CalendarIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                  )
                }}
              />
              {dateError && (
                <FormHelperText error>{dateError}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={4} sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={applyDateFilter}
                sx={{ mr: 1, borderRadius: 2 }}
                disabled={!!dateError}
              >
                Aplicar
              </Button>
              <Button 
                variant="outlined"
                onClick={resetFilters}
                sx={{ borderRadius: 2 }}
              >
                Limpar
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Calendar */}
        <Paper sx={{ p: 3, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
          {/* Calendar Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
              {getFullMonthYear()}
            </Typography>
            
            <Box>
              <IconButton onClick={goToPreviousMonth}>
                <NavigateBefore />
              </IconButton>
              <Button 
                variant="outlined" 
                startIcon={<TodayIcon />}
                onClick={goToToday}
                sx={{ mx: 1, borderRadius: 2 }}
              >
                Hoje
              </Button>
              <IconButton onClick={goToNextMonth}>
                <NavigateNext />
              </IconButton>
            </Box>
          </Box>
          
          {/* Calendar Grid */}
          <Box sx={{ 
            display: 'table', 
            width: '100%', 
            borderCollapse: 'collapse',
            border: '1px solid #e0e0e0',
            textAlign: 'center'
          }}>
            {/* Day headers */}
            <Box sx={{ display: 'table-row' }}>
              {dayNames.map((day) => (
                <Box 
                  key={day} 
                  sx={{ 
                    display: 'table-cell',
                    p: 1, 
                    fontWeight: 'bold',
                    borderBottom: '1px solid #e0e0e0',
                    borderRight: '1px solid #e0e0e0',
                    backgroundColor: '#f5f5f5'
                  }}
                >
                  {day}
                </Box>
              ))}
            </Box>
            
            {/* Calendar weeks */}
            {Array.from({ length: 6 }).map((_, weekIndex) => (
              <Box key={`week-${weekIndex}`} sx={{ display: 'table-row' }}>
                {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {
                  const dayEvents = getEventsForDay(day);
                  const isCurrentDay = day.toDateString() === new Date().toDateString();
                  const isSelected = isDaySelected(day);
                  const isFirstDayOfMonth = day.getDate() === 1;
                  const dayLabel = isFirstDayOfMonth || !isCurrentMonth(day) 
                    ? formatDayLabel(day)
                    : day.getDate();
                  
                  return (
                    <Box 
                      key={`day-${weekIndex}-${dayIndex}`} 
                      sx={{ 
                        display: 'table-cell',
                        height: '100px',
                        minWidth: '100px',
                        p: 1,
                        verticalAlign: 'top',
                        borderBottom: '1px solid #e0e0e0',
                        borderRight: '1px solid #e0e0e0',
                        backgroundColor: isCurrentMonth(day) ? '#FFFFFF' : '#F9F9F9',
                        opacity: isCurrentMonth(day) ? 1 : 0.6,
                        position: 'relative',
                        '&:hover': {
                          backgroundColor: '#f8f8f8'
                        }
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        mb: 1 
                      }}>
                        <CalendarDay selected={isSelected || isCurrentDay}>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontWeight: isCurrentDay || isSelected ? 'bold' : 'normal',
                              color: (isCurrentDay || isSelected) ? 'inherit' : 'text.primary',
                            }}
                          >
                            {typeof dayLabel === 'number' ? dayLabel : dayLabel}
                          </Typography>
                        </CalendarDay>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: 0.5,
                        maxHeight: '70px',
                        overflow: 'auto'
                      }}>
                        {dayEvents.map((event, eventIndex) => (
                          <Box
                            key={`${event.id}-${eventIndex}`}
                            sx={{
                              backgroundColor: getEventColor(event.type),
                              color: 'white',
                              fontSize: '0.7rem',
                              borderRadius: '4px',
                              p: 0.5,
                              textAlign: 'center',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {formatEventTitle(event)}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Legend */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Legenda
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4}>
              <Box sx={{
                backgroundColor: '#F44336',
                color: 'white',
                p: 1,
                borderRadius: 1,
                textAlign: 'center'
              }}>
                Crítico
              </Box>
            </Grid>
            
            <Grid item xs={6} sm={4}>
              <Box sx={{
                backgroundColor: '#FF9800',
                color: 'white',
                p: 1,
                borderRadius: 1,
                textAlign: 'center'
              }}>
                Atenção
              </Box>
            </Grid>
            
            <Grid item xs={6} sm={4}>
              <Box sx={{
                backgroundColor: '#4CAF50',
                color: 'white',
                p: 1,
                borderRadius: 1,
                textAlign: 'center'
              }}>
                Sem risco
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Calendario; 