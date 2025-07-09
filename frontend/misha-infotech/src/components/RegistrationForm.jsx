import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();

  /* ───────────────────────── state ───────────────────────── */
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    email: '',
    mobile: '',
    phone: '',
    stateId: '',
    city: '',
    hobbies: [],
    photo: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ───────────────── fetch all states once ───────────────── */
  useEffect(() => {
    api.get('/states')
       .then(res => setStates(res.data))
       .catch(() => alert('Failed to load states'));
  }, []);

  /* ────── fetch cities when stateId changes ────── */
  useEffect(() => {
    if (!formData.stateId) {
      setCities([]);
      return;
    }
    setLoadingCities(true);
    api.get(`/states/${formData.stateId}/cities`)
       .then(res => setCities(res.data))
       .catch(() => {
         alert('Failed to load cities');
         setCities([]);
       })
       .finally(() => setLoadingCities(false));
  }, [formData.stateId]);

  /* ───────────────── handle form inputs ───────────────── */
  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox' && name === 'hobbies') {
      const updated = checked
        ? [...formData.hobbies, value]
        : formData.hobbies.filter(h => h !== value);
      setFormData({ ...formData, hobbies: updated });
      return;
    }

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
      return;
    }

    if (type === 'file') {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, photo: reader.result });
      if (files[0]) reader.readAsDataURL(files[0]);
      return;
    }

    /* dropdowns / text */
    if (name === 'stateId') {
      setFormData({
        ...formData,
        stateId: Number(value), // convert to number
        city: ''                // reset city when state changes
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /* ───────────────── validate before submit ───────────────── */
  const validateForm = () => {
    const err = {};

    if (!formData.name.trim()) err.name = 'Name is required';
    else if (formData.name.length > 25) err.name = 'Max 25 chars';

    if (!formData.gender) err.gender = 'Gender is required';

    if (!formData.dob) err.dob = 'DOB is required';
    else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dob))
      err.dob = 'Use dd/mm/yyyy';

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      err.email = 'Invalid email';

    if (!formData.mobile && !formData.phone)
      err.contact = 'Mobile or Phone required';

    if (!formData.stateId) err.state = 'State required';
    if (formData.stateId && !formData.city) err.city = 'City required';

    if (formData.photo &&
        !formData.photo.startsWith('data:image/jpeg') &&
        !formData.photo.startsWith('data:image/png'))
      err.photo = 'Photo must be JPG / PNG';

    if (Object.keys(err).length === 0 && !formData.agreeTerms)
      err.agreeTerms = 'You must accept terms';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ───────────────── submit handler ───────────────── */
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const stateName = states.find(s => s.id === formData.stateId)?.name || '';
      await api.post('/users', {
        ...formData,
        state: stateName,
        hobbies: formData.hobbies.join(',')
      });
      navigate('/users');
    } catch (err) {
      console.error(err);
      alert('Server error – see console for details');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ───────────────────────── JSX ───────────────────────── */
  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h2>User Registration Form</h2>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>Name* :</label>
            <input
              name="name"
              maxLength="25"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Enter employee name"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Gender */}
          <div className="form-group mt-2">
            <label>Gender* :</label>{' '}
            {['male', 'female'].map(g => (
              <div key={g} className="form-check form-check-inline">
                <input
                  type="radio"
                  name="gender"
                  id={g}
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor={g} className="form-check-label">
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              </div>
            ))}
            {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
          </div>

          {/* DOB */}
          <div className="form-group mt-2">
            <label>DOB* (dd/mm/yyyy) :</label>
            <input
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="dd/mm/yyyy"
              className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
            />
            {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
          </div>

          {/* Email */}
          <div className="form-group mt-2">
            <label>Email :</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Contact */}
          <div className="form-group mt-2">
            <label>Contact No.* :</label>
            <div className="row">
              <div className="col">
                <input
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col">
                <input
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            {errors.contact && <div className="invalid-feedback d-block">{errors.contact}</div>}
          </div>

          {/* State & City */}
          <div className="row mt-2">
            <div className="col">
              <label>State* :</label>
              <select
                name="stateId"
                value={formData.stateId}
                onChange={handleChange}
                className={`form-control ${errors.state ? 'is-invalid' : ''}`}
              >
                <option value="">Select State</option>
                {states.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.state && <div className="invalid-feedback">{errors.state}</div>}
            </div>

            <div className="col">
              <label>City* :</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!formData.stateId || loadingCities}
                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
              >
                <option value="">
                  {loadingCities ? 'Loading…' : 'Select City'}
                </option>
                {cities.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>
          </div>

          {/* Hobbies */}
          <div className="form-group mt-2">
            <label>Hobbies :</label>{' '}
            {['Chess', 'Cricket', 'Football', 'Hockey'].map(h => (
              <div key={h} className="form-check form-check-inline">
                <input
                  type="checkbox"
                  name="hobbies"
                  id={h}
                  value={h}
                  checked={formData.hobbies.includes(h)}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor={h} className="form-check-label">
                  {h}
                </label>
              </div>
            ))}
          </div>

          {/* Photo */}
          <div className="form-group mt-2">
            <label>Photo :</label>
            <input
              type="file"
              name="photo"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
              className={`form-control-file ${errors.photo ? 'is-invalid' : ''}`}
            />
            {errors.photo && <div className="invalid-feedback d-block">{errors.photo}</div>}
          </div>

          {/* Terms */}
          <div className="form-check mt-3">
            <input
              type="checkbox"
              name="agreeTerms"
              id="agree"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className={`form-check-input ${errors.agreeTerms ? 'is-invalid' : ''}`}
            />
            <label htmlFor="agree" className="form-check-label">
              I agree to Terms and Conditions
            </label>
            {errors.agreeTerms && (
              <div className="invalid-feedback d-block">{errors.agreeTerms}</div>
            )}
          </div>

          <button className="btn btn-primary mt-3" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting…' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

