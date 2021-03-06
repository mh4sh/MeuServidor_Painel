import React, { Component } from 'react';

import { ServersService } from '../services/ServersService';
import { NodeQueryService } from '../services/NodeQueryService';

import {Link, Route} from 'react-router-dom';

function converteNumero(number){
    switch (number) {
        case 1:
            return 'um';
        case 2:
            return 'dois';
        case 3:
            return 'três';
        case 4:
            return 'quatro';
        case 5:
            return 'cinco';
        case 6:
            return 'seis';
        case 7:
            return 'sete';
        case 8:
            return 'oito';
        case 9:
            return 'nove';
        case 10:
            return 'dez';
        case 11:
            return 'onze';
        case 12:
            return 'doze';
        case 13:
            return 'treze';
        case 14:
            return 'quatorze';
        case 15:
            return 'quinze';
        default:
            return number;
            break;
    }
}

export default class Servers extends Component {
    constructor(props){
        super(props);
        this.state = {
            listServers: null,
            limit: 15, 
            loading: false
        }
    }
    
    async componentDidMount(){
        this.loading(true, 1);
        const response = await ServersService.listAll(),
            listServers = response.data.servers,
            limit = response.data.limit;

        if(response.status===200){

            this.loading(true, 2);
            this.setState({
                listServers,
                limit
            });
        }
    }
    
    loading(isOn, nivel){
        if(isOn){
            switch (nivel) {
                case 1:
                    this.setState({loading: true});
                    setTimeout(()=> {
                        this.setState({
                            position: '35%'
                        })
                    }, 200)
                    break;
                case 2:
                    this.setState({position: '50%'});
                    setTimeout(()=> {
                        this.setState({
                            position: '70%'
                        })
                    }, 30)
                    setTimeout(()=> {
                        this.loading(false, 0)
                    }, 400)
                    
                    break;
            }
        } else {
            this.setState({
                loading: false,
                position: "20%"
            })
        }
    }

    render(){
        const {state} = this;
        
        return (
            <>
                {
                    !state.loading ? (
                        <div style={{borderRadius: 0, height: 3, top: 0}} className="bg-white"></div>
                    ) : (
                        <div style={{borderRadius: 0, height: 3, top: 0}} className="progress" id="progress">
                            <div role="progressbar" id="progressbar" style={{width: state.position}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" className="progress-bar bg-dark">
                            </div>
                        </div>
                    ) 
                }
                <div className="container-fluid">
                    
                    <Route path={`/servidores/`} exact component={() => <Listar listServers={state.listServers} limit={state.limit} /> } />
                    <Route path={`/servidor/adicionar/`} exact component={() => <Adicionar listServers={state.listServers} limit={state.limit} /> } />
                </div>
            </>
        )
    }
}


class Listar extends Component {

    static defaultProps = {
        listServers: {},
        limit: 15
    }
    
    render(){
        const {props} = this;
        if(props.listServers===null){
            return (
                <div></div>
            )
        }


        if(props.listServers.length===0){
            return (
                <>
                    <div className="container mt-5">
                        <div className="row text-dark" id="header">
                            <div className="col-sm-8">
                                <p>Você tem <span className="text-info">{`${props.listServers.length} de ${props.limit}`}</span> contas configuradas</p>
                            </div>
                            <hr />
                        </div>
                        <div className="container">
                            <div className="col-6 px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                                <h2>Servidores</h2>
                                <p>
                                    Você ainda não tem servidor adicionado. <br />
                                    Adicione o nove servidor abaixo.  
                                </p>
                                <Link to={'/servidor/adicionar/'} className="btn btn-outline-info my-2 my-sm-0 align-middle">Adicionar Servidor</Link>
                            </div>
                        </div>
                    </div>
                </>
            )
        }


        const limiTreached = () => {
            if(props.listServers.length>=props.limit){
                return '';
            } 
        return (
            <div className="col-sm-4 align-middle">
                <Link to={'/servidor/adicionar/'} className="btn btn-outline-info my-2 my-sm-0 btn-block align-middle">Adicionar Servidor</Link>
            </div>
            )
    }
        return (
            <>
                <div className="container mt-5">
                    <div className="row text-dark" id="header">
                        <div className="col-sm-8">
                            <h2>Servidores</h2>
                            <p>Você tem <span className="text-info">{`${props.listServers.length} de ${props.limit}`}</span> contas configuradas</p>
                        </div>
                        {
                            limiTreached()
                        }
                    </div>
                    <hr />
                    <div className="row" id="serversList">
                        {
                            props.listServers.map((item) => {
                                return (
                                <div className="col-sm-4 mb-4" key={item._id}>
                                    <Link to={`/servidor/dados/${item._id}`} className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-auto mr-auto">
                                                    <h5 className="card-title mb-1 text-dark">{item.nickname} <span className="text-secondary h6">> {converteNumero(item.number)}</span> <br />
                                                    <span className="text-secondary h6">{item.data.ip}</span></h5>
                                                </div>
                                                <div className="col-auto justify-content-end">
                                                { item.status=="active" ?  <small className="text-success">{item.availability}% <br /> Disponivel</small> : <small className="text-danger">Não<br />responde</small> }
                                                </div>
                                            </div>
                                            <hr />
                                            <p className="card-text text-muted row">
                                                <div className="col-sm-6">
                                                    <label for="progress_ram">Ram</label>
                                                    <div className="progress" id="progress_ram">
                                                        <div className={`progress-bar ${(item.data.ram_usage*100)/item.data.ram_total>=75 ? 'bg-danger' : 'bg-info' }`} role="progressbar" style={{width: `${(item.data.ram_usage*100)/item.data.ram_total}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label for="progress_ram">Disk</label>                                                    
                                                    <div className="progress">
                                                        <div className={`progress-bar ${(item.data.disk_usage*100)/item.data.disk_total>=75 ? 'bg-danger' : 'bg-info' }`} role="progressbar" style={{width: `${(item.data.disk_usage*100)/item.data.disk_total}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            )})
                        }
                    </div>
                </div>
            </>
        )
    }
}


class Adicionar extends Component {

    static defaultProps = {
        listServers: {},
        limit: 15
    }
    
    constructor(props){
        super(props);
        this.state = {
            listAccounts: null,
            accountSelected: {}
        }
    }

    async componentDidMount(){
        const response = await NodeQueryService.listAll(),
            listAccounts = response.data.accounts;
        this.setState({
            listAccounts
        });
    }
    render(){
        const {state, props} = this,
            {listAccounts, accountSelected} = state;
        if(listAccounts===null){
            return <div></div>;
        }

        if(listAccounts.length===0){
            return (
                <div>
                    para adicioanr um servidor você tem que ter uma conta NodeQuery cadastrada!
                </div>
            )
        }

        return (
            <>
                <div className="container mt-5">
                    <div className="row text-dark" id="header">
                        <div className="col-sm-8">
                            <h2>Adicionar - Servidores</h2>
                        </div>
                        <div className="col-sm-4 align-middle">
                            <Link to={'/nodequery/adicionar/'} className="btn btn-outline-info my-2 my-sm-0 btn-block align-middle">Adicionar outra Conta</Link>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-sm-6 mt-5 ">
                            {state.error ? <div className="alert alert-danger" role="alert">{state.msg}</div> : ''}
                            <div className="col">
                                <select className="form-control">
                                    <option value="null">Default select</option>
                                    {
                                        listAccounts.map(account => {
                                            return (
                                                <option >{account.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col mt-3">
                                <input type="text" className="form-control" placeholder="Selecionar Servidor" name="api" onChange={this.handleChange} value={state.api} />
                            </div>
                            <div className="col mt-4">
                                <button className="btn btn-outline-info" onClick={this.addApi}>{state.loading ? 'Carregando...' : 'Instalar' }</button>
                                <Link to={'/nodequery/'} className="btn btn-outline-danger ml-2">Voltar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}