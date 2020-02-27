import React, { Component } from 'react';

class ActionableTable extends Component {

    actions = [];
    headers = [];
    tableData = [];
    constructor(props) {
        super(props);
    }


    render() {
        const { headers, tableData, actions } = this.props;
        let renderHeader, renderTableBody = '';

        this.headers = headers || (tableData && tableData.length && Object.keys(tableData[0])) || [];
        renderHeader = this.headers.map((headerItem) => {
            if (!renderHeader)
                return (<th scope="col">{headerItem}</th>);
            else
                return (<th scope="col">{headerItem}</th>);
        });

        
        renderTableBody = tableData.map((tData, index) => {
            let td, action;

            td = (
                Object.keys(tData).map((tDataKey) => {
                    if (typeof tData[tDataKey] == 'object' && !(tData[tDataKey] instanceof Array))
                        return (<td>{JSON.stringify(tData[tDataKey])}</td>)
                    else
                        return (<td>{tData[tDataKey]}</td>)
                })
            )

            //render action button(s)        
            action = (actions && actions.map((action) => {
                return (<button onClick={(e)=>{ action.action(tData)}}>{action.name}</button>)
            }))
            action = action ? (<td>{action}</td>): '';

            return (<tr id={index}>{td}{action}</tr>)
        })


        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            {renderHeader}{actions && actions.length && (<th></th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableBody}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ActionableTable;