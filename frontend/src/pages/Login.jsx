import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';



function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { email, password } = formData;

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

    const userData = {
      email, password,
    };
    dispatch(login(userData));

  };

  if (isLoading) {
    return <Spinner />;
  }

  return <>
    <section className='heading'>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Please Login to raise a ticket</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>


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


        <button type='submit' className='btn btn-block'>Submit</button>
      </form>
    </section>
  </>;
}

export default Login;
