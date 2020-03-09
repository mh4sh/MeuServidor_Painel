import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ListAcconts extends Component {

    static defaultProps = {
        listAccounts: []
    }

    selectAccount(id){
    }

    render(){
        const {props} = this;
        return (
            <div className="row">
                {props.listAccounts.map(account => {
                    return (
                        <div className="col-sm-6 mb-4" key={account._id}>
                            <Link to={`/nodequery/dados/${account._id}`} className="card">
                                <div className="card-body" onClick={this.selectAccount.bind(this, account._id)}>
                                    <h5 className="card-title mb-1 text-dark">> {account.nickname}</h5>
                                    <h6 className="card-title mb-1 text-dark">{account.name}</h6>
                                    <p className="card-text text-muted">
                                        {account.api}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ListAcconts;