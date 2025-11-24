import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegistroPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    tagClash: '',
    edad: '',
    nacionalidad: 'España',
    modalidad_preferida: 'Ladder'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviamos los datos al backend
      // Nota: Por simplicidad, enviamos un array de mazos vacío [] por ahora
      const datosCompletos = { ...formData, mazos: [] };
      
      await axios.post('http://localhost:5000/api/auth/registro', datosCompletos);
      
      alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.mensaje || 'Error al registrarse');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{textAlign: 'center'}}>Nuevo Jugador</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="nombre" placeholder="Nombre de Usuario" onChange={handleChange} required style={styles.input} />
          <input name="email" type="email" placeholder="Correo" onChange={handleChange} required style={styles.input} />
          <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required style={styles.input} />
          <input name="tagClash" placeholder="Tag de Clash Royale (#...)" onChange={handleChange} required style={styles.input} />
          
          <div style={{display: 'flex', gap: '10px'}}>
            <input name="edad" type="number" placeholder="Edad" onChange={handleChange} style={{...styles.input, width: '50px'}} />
            <select name="nacionalidad" onChange={handleChange} style={styles.input}>
              <option value="España">España</option>
              <option value="Latam">Latam</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <button type="submit" style={styles.button}>Registrarme</button>
        </form>
        <p style={{textAlign: 'center', marginTop: '10px'}}>
          ¿Ya tienes cuenta? <Link to="/login">Entra aquí</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#34495e' },
  card: { background: 'white', padding: '2rem', borderRadius: '8px', width: '320px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '8px', border: '1px solid #ccc', borderRadius: '4px' },
  button: { padding: '10px', background: '#27ae60', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }
};

export default RegistroPage;