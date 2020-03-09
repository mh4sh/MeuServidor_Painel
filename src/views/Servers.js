import React, { Component } from 'react';


class Servers extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading: false,
            position: '20%'
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
                    <div className="container mt-5">
                        <div className="row text-dark" id="header">
                            <div className="col-sm-8">
                                <h2>Servidores</h2>
                                <p>Você tem <span className="text-info"></span> contas configuradas</p>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </>
        )
    }
}


export default Servers;