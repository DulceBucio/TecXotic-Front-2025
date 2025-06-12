import './FloatData.css'
import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { copilot_address } from '../../Constants';

const FloatData = () => {
  const [view, setView] = useState(0);
  const [rawData, setRawData] = useState('');
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMetrics, setSelectedMetrics] = useState({
    pressure: true,
    temperature: true,
    depth: false,
    altitude: false
  });

  const loadFloatData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const rawResponse = await fetch(`${copilot_address}/data?format=raw`);
      if (!rawResponse.ok) throw new Error('Failed to fetch raw data');
      const rawText = await rawResponse.text();
      setRawData(rawText);

      const jsonResponse = await fetch(`${copilot_address}/data?format=json&limit=50`);
      if (!jsonResponse.ok) throw new Error('Failed to fetch JSON data');
      const jsonData = await jsonResponse.json();
      
      const transformedData = jsonData.data
        .filter(entry => entry.timestamp)
        .map((entry, index) => ({
          id: index,
          timestamp: new Date(entry.timestamp_iso || entry.timestamp).toLocaleTimeString(),
          fullTimestamp: entry.timestamp,
          pressure: entry.pressure || 0,
          temperature: entry.temperature || 0,
          depth: entry.depth || 0,
          altitude: entry.altitude || 0
        }))
        .reverse(); 

      setSensorData(transformedData);
    } catch (error) {
      console.error('Error loading float data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFloatData();
    const interval = setInterval(loadFloatData, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggleMetric = (metric) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));
  };

  const getMetricColor = (metric) => {
    const colors = {
      pressure: '#FFF9D7',
      temperature: '#DDB1CA',
      depth: '#AACCAA',
      altitude: '#9D97B0'
    };
    return colors[metric];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>
            Time: {data.fullTimestamp}
          </p>
          {payload.map((entry) => (
            <p key={entry.dataKey} style={{ 
              margin: '2px 0', 
              color: entry.color 
            }}>
              {`${entry.dataKey}: ${entry.value}${getUnit(entry.dataKey)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getUnit = (metric) => {
    const units = {
      pressure: ' mbar',
      temperature: ' °C',
      depth: ' m',
      altitude: ' m'
    };
    return units[metric] || '';
  };

  return (
    <div className="float-data-container">
      <div className="header-container">
        <h1>FLOAT DATA</h1>
      </div>
      <div className="views-container">
        <button 
          className={`button-view ${view === 0 ? 'active' : ''}`} 
          onClick={() => setView(0)}
        >
          Raw
        </button>
        <button 
          className={`button-view ${view === 1 ? 'active' : ''}`} 
          onClick={() => setView(1)}
        >
          Graph
        </button>
      </div>

      {error && (
        <div>
          <p className='error-msg'> Reloading float connection...</p>
          <pre className='data-container'>
                No data available!
              </pre>
        </div>
      )}

      <div className='view'>
        {view === 0 && (
          <div className='raw-data-container'>
            <pre className='raw-data'> { rawData || '...' } </pre>
          </div>
        )}
        
        {view === 1 && (
          <div>
            <div>
              <div>
                {Object.entries(selectedMetrics).map(([metric, isSelected]) => (
                  <label key={metric} style={{ 
                    marginRight: '4px', 
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleMetric(metric)}
                    />
                    <span style={{ color: getMetricColor(metric)}}>
                      {metric.charAt(0).toUpperCase() + metric.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ width: '100%', height: 400 }}>
              {sensorData.length > 0 ? (
                <ResponsiveContainer>
                  <LineChart
                    data={sensorData}
                    margin={{right: 10, left: 6, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      interval={Math.max(1, Math.floor(sensorData.length / 10))}
                      tick={{stroke: 'white'}}
                    />
                    <YAxis tick={{stroke: 'white'}}/>
                    <Legend />
                    
                    {selectedMetrics.pressure && (
                      <Line 
                        type="monotone" 
                        dataKey="pressure" 
                        stroke={getMetricColor('pressure')}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        name="Pressure (mbar)"
                      />
                    )}
                    {selectedMetrics.temperature && (
                      <Line 
                        type="monotone" 
                        dataKey="temperature" 
                        stroke={getMetricColor('temperature')}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        name="Temperature (°C)"
                      />
                    )}
                    {selectedMetrics.depth && (
                      <Line 
                        type="monotone" 
                        dataKey="depth" 
                        stroke={getMetricColor('depth')}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        name="Depth (m)"
                      />
                    )}
                    {selectedMetrics.altitude && (
                      <Line 
                        type="monotone" 
                        dataKey="altitude" 
                        stroke={getMetricColor('altitude')}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        name="Altitude (m)"
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  border: '2px dashed #dee2e6'
                }}>
                  <p style={{ color: '#ffffff', fontSize: '18px' }}>
                    {loading ? 'Loading data...' : 'No sensor data available'}
                  </p>
                </div>
              )}
            </div>

            {sensorData.length > 0 && (
              <div className='data-summary'>
                <div className='data-summary-container'>
                  <div className='data-summary-info'>Latest Reading: {sensorData[sensorData.length - 1]?.fullTimestamp}</div>
                  <div className='data-summary-info'>Total Data Points: {sensorData.length}</div>
                  <div className='data-summary-info'>
                    Pressure Range: {Math.min(...sensorData.map(d => d.pressure)).toFixed(1)} - {Math.max(...sensorData.map(d => d.pressure)).toFixed(1)} mbar
                  </div>
                  <div className='data-summary-info'>
                    Temperature Range: {Math.min(...sensorData.map(d => d.temperature)).toFixed(1)} - {Math.max(...sensorData.map(d => d.temperature)).toFixed(1)} °C
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatData;