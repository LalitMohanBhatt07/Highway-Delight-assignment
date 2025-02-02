import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

function OTPForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: data.otp }),
      });

      const responseData = await response.json();
      if (response.ok) {
        navigate('/dashboard');
      } else {
        setError(responseData.message || 'OTP verification failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-white shadow-lg rounded-lg w-96 p-10">
        <h2 className="text-lg font-semibold text-purple-800 mb-4">OTP Verification</h2>
        <p className="text-gray-700 mb-6">Please enter the OTP sent to {email}.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              id="otp"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              {...register('otp', { required: 'OTP is required' })}
            />
            {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Verify OTP
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default OTPForm;
