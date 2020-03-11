import React, { Component } from 'react';

import ListAcconts from '../components/NodeQuery/ListAcconts';
import ListServers from '../components/NodeQuery/ListServers';

import { NodeQueryService } from '../services/NodeQueryService';

import {Link, Route} from 'react-router-dom';

export default class NodeQuery extends Component {
    constructor(props){
        super(props);
        this.state = {
            listAccounts: null,
            limit: 6, 
            loading: false
        }

        this.addApi = this.addApi.bind(this);
        this.updateAccountServers = this.updateAccountServers.bind(this);
        this.removeAccount = this.removeAccount.bind(this);
    }
    
    async componentDidMount(){
        this.loading(true, 1)
        const response = await NodeQueryService.listAll(),
            listAccounts = response.data.accounts,
            limit = response.data.limit;

        this.loading(true, 2)
        this.setState({
            listAccounts,
            limit
        });
    }
    
    addApi = async ({nickname, api}) => {
        this.loading(true, 1)
        const response = await NodeQueryService.add({nickname, api});
        
        if(response.status===200){
            this.loading(true, 2)
            this.setState(state => { return {
                listAccounts: [...state.listAccounts, response.data]
            }});
            this.props.history.push('/nodequery/');
        } else {
            this.loading(true, 2)
            return response;
        }

    }

    updateAccountServers = async (id) => {
        this.loading(true, 1)
        const response = await NodeQueryService.updateServers(id),
            {listAccounts} = this.state;

        this.loading(true, 2)
        const itemIndex = listAccounts.findIndex(item => id === item._id);
        listAccounts[itemIndex].servers = response.data;

        this.setState({listAccounts});
    }

    removeAccount = async (id) => {
        this.loading(true, 1)
        const response = await NodeQueryService.remove(id),
            {listAccounts} = this.state;

        if(response.status===200){

            this.loading(true, 2)
            const itemIndex = listAccounts.findIndex(item => item._id === id);
            listAccounts.splice(itemIndex, 1);
            this.props.history.push('/nodequery/');
            this.setState({listAccounts});
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
                    <Route path={`/nodequery/`} exact component={() => <Listar listAccounts={state.listAccounts} limit={state.limit}/>} />
                    <Route path={`/nodequery/adicionar/`} component={() => <Adicionar addApi={this.addApi}/>} />
                    <Route path={`/nodequery/dados/:idAccount`} component={(event) => <Dados updateAccountServers={this.updateAccountServers} removeAccount={this.removeAccount} listAccounts={state.listAccounts} params={event.match.params} />} />
                </div>
            </>
        )
    }
}

class Listar extends Component {

    static defaultProps = {
        listAccounts: {},
        limit: 6
    }

    render(){
        const {props} = this;
        if(props.listAccounts===null){
            return (
                <div></div>
            )
        }

        if(props.listAccounts.length===0){

            return (
                <>
                    <div className="container mt-5">
                        <div className="row text-dark" id="header">
                            <div className="col-sm-8">
                                <p>Você tem <span className="text-info">{`${props.listAccounts.length} de ${props.limit}`}</span> contas configuradas</p>
                            </div>
                            <hr />
                        </div>
                        <div className="container">
                            <div className="col-6 px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                                <h2>API NodeQuery</h2>
                                <p>
                                    Você ainda não tem conta NodeQuery configurada. <br />
                                    Para poder adicionar um servidor sinclonize com a sua conta do NodeQuery primeiro.  
                                </p>
                                <Link to={'/nodequery/adicionar/'} className="btn btn-outline-info my-2 my-sm-0 align-middle">Adicionar Conta</Link>
                            </div>
                        </div>
                    </div>
                </>
            )
        }

        const limiTreached = () => {
                if(props.listAccounts.length>=props.limit){
                    return '';
                } 
            return (
                <div className="col-sm-4 align-middle">
                    <Link to={'/nodequery/adicionar/'} className="btn btn-outline-info my-2 my-sm-0 btn-block align-middle">Adicionar Conta</Link>
                </div>
                )
        }
        return (
            <>
                <div className="container mt-5">
                    <div className="row text-dark" id="header">
                        <div className="col-sm-8">
                            <h2>API NodeQuery</h2>
                            <p>Você tem <span className="text-info">{`${props.listAccounts.length} de ${props.limit}`}</span> contas configuradas</p>
                        </div>
                        {
                            limiTreached()
                        }
                        
                    </div>
                    <hr />
                </div>
                <div className="container">
                    <ListAcconts listAccounts={props.listAccounts} />
                </div>
            </>
        )
    }
}


class Adicionar extends Component {

    constructor(props){
        super(props);

        this.state = {
            nickname: '',
            api: '',
            error: false,
            msg: '',
            loading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.addApi = this.addApi.bind(this);
    }

    handleChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }
    
    addApi = async () => {
        this.setState({
            loading: true
        })
        const response = await this.props.addApi(this.state);
        if(response!==undefined){
            this.setState({
                error: true,
                loading: false,
                msg: response.data
            })
        }
    }

    render(){
        const { state } = this;
        return (
            <>
                <div className="container mt-5">
                    <div className="row text-dark" id="header">
                        <div className="col-sm-8">
                            <h2>Adicionar - API NodeQuery</h2>
                        </div>
                        <div className="col-sm-4 align-middle">
                            <a href={'https://nodequery.com/settings/api'} target="_blank" className="btn btn-outline-info my-2 my-sm-0 btn-block align-middle">Pegar API</a>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-sm-6 mt-5 ">
                            {state.error ? <div className="alert alert-danger" role="alert">{state.msg}</div> : ''}
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Apelido" name="nickname" onChange={this.handleChange} value={state.nickname} />
                            </div>
                            <div className="col mt-3">
                                <input type="text" className="form-control" placeholder="Codigo API" name="api" onChange={this.handleChange} value={state.api} />
                            </div>
                            <div className="col mt-4">
                                <button className="btn btn-outline-info" onClick={this.addApi}>{state.loading ? 'Carregando...' : 'Adicionar' }</button>
                                <Link to={'/nodequery/'} className="btn btn-outline-danger ml-2">Voltar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


class Dados extends Component {

    static defaultProps = {
        account: {
        },
        updateAccountServers: () => {},
        removeAccount: () => {}
    }

    constructor(props){
        super(props);

        this.state = {
            account: []
        }

    }

    async componentDidMount(){
        const {params, listAccounts} = this.props;

        if(listAccounts!=null){
            const account = await listAccounts.filter(account => account._id===params.idAccount)[0];
            if(account!==undefined){
                this.setState({
                    account
                })
            } else {
                console.log("ID Inválido!")
            }
        }
    }

    removeAccount(){
        const { state, props } = this;
        props.removeAccount(state.account._id);
    }

    updateAccountServers(){
        const {props, state} = this;
        props.updateAccountServers(state.account._id);
    }

    render(){
        const {account} = this.state;
        if(account.installed){
            var installed = account.installed.length;
        } else {
            var installed = 0;
        }
        return (
            <>
                <div className="container mt-5">
                    <div className="row text-dark" id="header">
                        <div className="col-auto mr-auto">
                            <h3>> {account.nickname}</h3>
                        </div>
                        <div className="col-auto justify-content-end row">
                            <div className="col">
                                <button className="btn btn-outline-danger mr-2 my-2 my-sm-0  " onClick={() => {this.removeAccount()}}>Apagar</button>
                                <button className="btn btn-outline-info my-2 my-sm-0  " onClick={() => {this.updateAccountServers()}}>Atualizar Servidores</button>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="container mt-5">
                    <div className="row text-dark">
                        <div className="col mr-auto">
                        <h5>Conta: {account.name}</h5>
                        </div>
                    </div>
                    <div className="row text-dark">
                        <div className="col mr-auto">
                        <p>Código API: {account.api}</p>
                        </div>
                    </div>
                    {
                        installed!==0 ? (
                            <div className="row mt-5">
                                <div className="card border-success mb-3 w-100">
                                    <div className="card-header">
                                        Servidores Instalados
                                    </div>
                                    <div className="card-body row">
                                        <ListServers account={account} itemsActived={true} />
                                    </div>
                                </div>
                            </div>
                        ) : ''
                    }
                    <div className="row mt-5">
                        <div className="card mb-3 w-100">
                            <div className="card-header">
                                Não Instalados
                            </div>
                            <div className="card-body row">
                                <ListServers account={account} itemsActived={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

