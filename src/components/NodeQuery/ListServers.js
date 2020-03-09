import React, {Component} from 'react';

import {Link} from 'react-router-dom';

class ListServers extends Component {

    static defaultProps = {
        account: {}
    }

    keysServers(){
        if(this.props.account.servers!==undefined){
            return Object.keys(this.props.account.servers);
        }

        return [];
    }

    render(){
        const {account, itemsActived} = this.props;
        let vez = 0;
        

        return (
            <>
                {this.keysServers().map(serverKey => {
                    if(account.servers[serverKey].actived===itemsActived){
                        vez++;
                        return (
                            <div className={"col-sm-4 mb-4 "} key={serverKey.toString()}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title mb-1 text-dark">{account.servers[serverKey].name}</h5>
                                        <h6 className="card-title mb-1 text-dark">{account.servers[serverKey].ip}</h6>
                                        <p className="card-text text-muted"> { account.servers[serverKey].status==="active"? <><span className="text-success"> {account.servers[serverKey].availability} </span> { !itemsActived ? <><br /><Link to={`/servidor/instalar/${account._id}/${serverKey}/`} className="btn btn-success btn-sm">Instalar</Link></> : <><br /><Link to={`/servidor/dados/${account.servers[serverKey].idMS}/`} className="btn btn-success btn-sm">Visualizar</Link></>  }</> : <><span className="text-danger">Inativo</span><br/><button className="btn btn-danger btn-sm disabled" disabled>Instalar</button> </>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </> 
        )
    }
}




export default ListServers;