import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FiLogIn } from 'react-icons/fi';

import './style.css';
import logoImg from '../../assets/logo.svg';
import herosImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Falha no login tente novamente!');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo Image" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <input type="submit" value="Entrar" className="button" />

                    <Link to="/register">
                        <FiLogIn siza={16} color="#E02041" />
                    Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={herosImg} alt="Heroes Image" />
        </div>
    )
}