import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { darkTheme, lightTheme } from '../../../utils/theme/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { BarChart, RadarChart } from "react-native-gifted-charts";
import { useWeather } from '../../../server/useWeather';
import { ForecastdayList } from '../../../types';


export default function Analytics() {
  const { darkMode } = useSelector((state: any) => state.theme);
  const { location } = useSelector((state: RootState) => state.location);

  const theme = darkMode ? darkTheme : lightTheme;

  const { weatherData, handlerWeatherData } = useWeather(location?.latitude ?? 0, location?.longitude ?? 0);

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      handlerWeatherData(30); 
    }
  }, [location]);


  const precipitationData = weatherData ? (weatherData as ForecastdayList).map((day, index) => ({
    value: day.day.totalprecip_mm,
    label: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    frontColor: theme.color === '#000000' ? '#4A90E2' : '#5DADE2',
  })) : [];



  const temperatureData = weatherData ? (weatherData as ForecastdayList).map((day, index) => ({
    value: day.day.avgtemp_c,
    label: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    dataPointText: `${Math.round(day.day.avgtemp_c)}°C`,
  })) : [];

  const radarTemperatureData = weatherData ? (weatherData as ForecastdayList).map((day) => day.day.avgtemp_c) : [];

  return (
    <ScrollView
      style={{ backgroundColor: theme.backgroundColor }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: theme.color }]}>Weather Analytics</Text>


      <View style={styles.chartContainer}>
        <Text style={[styles.chartTitle, { color: theme.color }]}>Precipitation Amount (mm)</Text>
        <BarChart
          data={precipitationData}
          barWidth={40}
          spacing={24}
          barBorderRadius={4}
          yAxisThickness={0}
          xAxisThickness={0}
          yAxisTextStyle={{ color: theme.color }}
          xAxisLabelTextStyle={{ color: theme.color }}
          noOfSections={4}
          maxValue={Math.max(...precipitationData.map(item => item.value), 10)}
        />
      </View>

 
      <View style={styles.chartContainer}>
        <Text style={[styles.chartTitle, { color: theme.color }]}>Average Temperature (°C)</Text>
      
      

        <RadarChart
          data={radarTemperatureData}
          labels={temperatureData.map(item => item.label)}
        />
        
      </View>

 
  
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  chartContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
});