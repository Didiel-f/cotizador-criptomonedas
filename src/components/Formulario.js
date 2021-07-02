import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import { Error } from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;



export const Formulario = () => {

    // state del listado de criptomonedas
    const [listaCripto, setListaCripto] = useState([]);

    const [error, setError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    const [ moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '', MONEDAS);

    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', listaCripto)

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            setListaCripto(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar si ambos campos están llenos
        if( moneda === '' || criptomoneda === '' ) {
            setError(true);
            return;
        };

        // Pasar los datos al componente principal
        setError(false);
        
    };
    
    return (
        <form
            onSubmit={ handleSubmit }
        >
            { error ? <Error mensaje="Todos los campos son obligatorios" /> : null }
            
            <SelectMonedas />

            <SelectCripto />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    )
}
