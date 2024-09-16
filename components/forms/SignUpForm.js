// components/forms/SignUpForm.js
import PropTypes from 'prop-types';
import { useState } from 'react';
import { eventSignUp } from '../../api/eventData';

const SignUpForm = ({ id, onSuccess, onError }) => {
  const [formData, setFormData] = useState({ event: id, role: '', user: '' });
  const [message, setMessage] = useState(''); // For feedback messages
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(''); // Clear previous messages

    try {
      await eventSignUp(id, formData);
      setMessage('Successfully signed up for the event!');
      setFormData({ event: id, role: '', user: '' });// Clear form after submission
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Sign-up failed', error);
      setMessage('Failed to sign up for the event. Please try again.');
      if (onError) onError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="user">Member Name </label>
        <input
          type="text"
          id="user"
          name="user"
          value={formData.user}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
      {message && <p>{message}</p>} {/* Display feedback message */}
    </form>
  );
};

SignUpForm.propTypes = {
  id: PropTypes.string.isRequired, // Assuming id is a string, adjust if needed
  // eslint-disable-next-line react/require-default-props
  onSuccess: PropTypes.func, // Optional prop
  // eslint-disable-next-line react/require-default-props
  onError: PropTypes.func,
};

export default SignUpForm;
