import { useState, useEffect } from 'react';
import { FaUser, } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const navigate = useNavigate();
  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when Logged in
    if (isSuccess || user) {
      navigate('/');
    }

    // Reset 
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Password do not match');
    } else {
      const userData = {
        name, email, password
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return <>
    <section className='heading'>
      <h1>
        <FaUser />Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id='name'
            name='name'
            value={name}
            placeholder='Enter your name'
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id='email'
            name='email'
            value={email}
            placeholder='Enter your Email '
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id='password'
            name='password'
            value={password}
            placeholder='Enter your password '
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id='password2'
            name='password2'
            value={password2}
            placeholder='Confirm your password '
            onChange={onChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-block'>Submit</button>
      </form>
    </section>
  </>;
}

export default Register;
