import React, { useState } from 'react';
import axios from 'axios';
import { Heart, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import './App.css';

const API_BASE_URL = 'https://backendhypertension-production.up.railway.app/api';

function App() {
  const [formData, setFormData] = useState({
    Age: '',
    Salt_Intake: '',
    Stress_Score: '',
    BP_History: 'Normal',
    Sleep_Duration: '',
    BMI: '',
    Medication: 'None',
    Family_History: 'No',
    Exercise_Level: 'Low',
    Smoking_Status: 'Non-Smoker'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/predict`, formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while making the prediction');
    } finally {
      setLoading(false);
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'Low':
        return <CheckCircle className="risk-icon" style={{ color: '#28a745' }} />;
      case 'Moderate':
        return <AlertTriangle className="risk-icon" style={{ color: '#ffc107' }} />;
      case 'High':
        return <Heart className="risk-icon" style={{ color: '#dc3545' }} />;
      default:
        return <Activity className="risk-icon" />;
    }
  };

  const getRiskClass = (riskLevel) => {
    switch (riskLevel) {
      case 'Low':
        return 'risk-low';
      case 'Moderate':
        return 'risk-moderate';
      case 'High':
        return 'risk-high';
      default:
        return '';
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1><Heart className="header-icon" /> Hypertension Risk Prediction</h1>
          <p>Assess your risk of developing hypertension using our advanced machine learning model</p>
        </header>

        <div className="card">
          <h2>Patient Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Age">Age (years)</label>
                <input
                  type="number"
                  id="Age"
                  name="Age"
                  value={formData.Age}
                  onChange={handleInputChange}
                  min="18"
                  max="100"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="BMI">BMI (kg/m²)</label>
                <input
                  type="number"
                  id="BMI"
                  name="BMI"
                  value={formData.BMI}
                  onChange={handleInputChange}
                  min="15"
                  max="50"
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Salt_Intake">Salt Intake (grams per day)</label>
                <input
                  type="number"
                  id="Salt_Intake"
                  name="Salt_Intake"
                  value={formData.Salt_Intake}
                  onChange={handleInputChange}
                  min="0"
                  max="20"
                  step="0.1"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Sleep_Duration">Sleep Duration (hours per night)</label>
                <input
                  type="number"
                  id="Sleep_Duration"
                  name="Sleep_Duration"
                  value={formData.Sleep_Duration}
                  onChange={handleInputChange}
                  min="3"
                  max="12"
                  step="0.5"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Stress_Score">Stress Score (1-10)</label>
                <input
                  type="number"
                  id="Stress_Score"
                  name="Stress_Score"
                  value={formData.Stress_Score}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="BP_History">Blood Pressure History</label>
                <select
                  id="BP_History"
                  name="BP_History"
                  value={formData.BP_History}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Smoking_Status">Smoking Status</label>
                <select
                  id="Smoking_Status"
                  name="Smoking_Status"
                  value={formData.Smoking_Status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Non-Smoker">Non-Smoker</option>
                  <option value="Smoker">Smoker</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="Family_History">Family History of Hypertension</label>
                <select
                  id="Family_History"
                  name="Family_History"
                  value={formData.Family_History}
                  onChange={handleInputChange}
                  required
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Medication">Current Medication</label>
                <select
                  id="Medication"
                  name="Medication"
                  value={formData.Medication}
                  onChange={handleInputChange}
                  required
                >
                  <option value="None">None</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="Exercise_Level">Exercise Level</label>
                <select
                  id="Exercise_Level"
                  name="Exercise_Level"
                  value={formData.Exercise_Level}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Analyzing...' : 'Predict Hypertension Risk'}
            </button>
          </form>

          {error && (
            <div className="error">
              <strong>Error:</strong> {error}
            </div>
          )}

          {result && (
            <div className="results">
              <h3>Prediction Results</h3>
              <div className="probability">
                {(result.probability * 100).toFixed(1)}% Risk
              </div>
              <div className={`risk-level ${getRiskClass(result.prediction === 1 ? 'High' : 'Low')}`}>
                {getRiskIcon(result.prediction === 1 ? 'High' : 'Low')}
                {result.prediction === 1 ? 'High' : 'Low'} Risk Level
              </div>
              <div className="recommendation">
                <h4>Message:</h4>
                <p>{result.message}</p>
              </div>
              <div className="model-info">
                <small>Prediction: {result.prediction === 1 ? 'Hypertension Risk Detected' : 'Low Risk'}</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
