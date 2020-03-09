import React, {Component} from 'react';
import logo from '../alexa.svg';

import {AltenticarService} from '../services/AltenticarService';

import {Link} from 'react-router-dom';

class Navbar extends Component {
    static defaultProps = {
        loading: false,
        progressBar: '20%' 
    }

    constructor(props){
        super(props);

        this.state = {
            loading: false,
            progressBar: '20%' 
        }
    }
    _logout = () => {
        AltenticarService.logout()
    }

    render(){
        const location = this.props.location;
        return (
            <div className="container-fluid bg-dark shadow-sm">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link to={"/"}>
                            <img src={logo} alt="Meu Servidor" width="30" height="30" />
                        </Link>
                        
                        <div className="navbar" id="navbarNav">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className={location.pathname==='/' ? "nav-item active" : "nav-item"}>
                                    <Link to={"/"} className="nav-link">Inicio</Link>
                                </li>
                                <li className={location.pathname.startsWith('/servidor') ? "nav-item active" : "nav-item"}>
                                    <Link to={"/servidores/"} className="nav-link">Servidores</Link>
                                </li>
                                <li className={location.pathname.startsWith('/nodequery/') ? "nav-item active" : "nav-item"}>
                                    <Link to={"/nodequery/"} className="nav-link">API NodeQuery</Link>
                                </li>
                            </ul>
                            <div className="form-inline my-2 my-lg-0 pt-2 pb-2">
                                <Link className="btn btn-outline-info my-2 my-sm-0 btn-sm" to="/servidor/adicionar/">Adicionar Servidor</Link>
                                <button className="btn btn-outline-danger my-2 my-sm-0 ml-2 btn-sm">Sair</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Navbar;