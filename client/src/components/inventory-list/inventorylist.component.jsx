import React from 'react';
//import './inventory.styles.scss';

import DataTable from 'react-data-table-component';
import Axios from 'axios';
import { connect } from 'react-redux';


const columns = [
    {
        name: 'Category',
        selector: 'category',
        sortable: true,
    },
    {
        name: 'Item',
        selector: 'item_name',
        sortable: true,
    },
    {
        name: 'Gender',
        selector: 'gender',
        sortable: false,
    },
    {
        name: 'Age',
        selector: 'age_range',
        sortable: false,
    },
    {
        name: 'Description',
        selector: 'description',
        sortable: false,
    },
    {
        name: 'On-Hand Count',
        selector: 'count',
        sortable: false,
    },
    {
        name: 'Price',
        selector: 'price',
        sortable: true,
    },
    {
        name: 'Best Price',
        selector: 'best_price',
        sortable: false,
    },
    {
        name: 'Last Purchased Date',
        selector: 'last_purchase_dt',
        sortable: false,
    },
    {
        name: 'Notes',
        selector: 'notes',
        sortable: false
    }
];

class InventoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inventory: [],
            resultsPerPage: 50,
            page: 0
        }
    }

    retrieveInventory() {
        //Axios.post(`/inventory/${this.state.resultsPerPage}/${this.state.page}`,
        Axios.post('/inventory/inventorylist',
        {token: this.props.jwt.token})
        .then(response => {
            if (response.error) return false;
            this.setState({
                ...this.state,
                inventory: response.data
            })
        })
    }

    componentDidMount() {
        this.retrieveInventory();
    }

    render() {
        const inventoryTitle = this.props.jwt.username + "'s Inventory"
        return (
            <DataTable 
                title={inventoryTitle}
                striped={true}
                highlightOnHover={true}
                fixedHeader={true}
                pagination={true}
                paginationPerPage={10}
                // theme='dark'
                columns={columns} 
                data={this.state.inventory} 
            />
        )
    }

};

const mapStateToProps = (state, ownProps) => {
    return {
        jwt: state.jwt
    }
}

export default connect(mapStateToProps)(InventoryList)








// import React from 'react';
// import Axios from 'axios';
// import ShowInventory from '../show-inventory/show-inventory.component';
// import { connect } from 'react-redux';

// class InventoryList extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             inventory: [],
//             resultsPerPage: 50,
//             page: 0
//         }
//     }

//     retrieveInventory() {
//         Axios.post(`/inventory/${this.state.resultsPerPage}/${this.state.page}`,
//         {token: this.props.jwt.token})
//         .then(response => {
//             if (response.error) return false
//             this.setState({
//                 ...this.state,
//                 inventory: response.data
//             })
//         })
//     }

//     componentDidMount () {
//         this.retrieveInventory()
//     }

//     componentDidUpdate ( _, prevState) {
//         if (this.state.resultsPerPage !== prevState.resultsPerPage || this.state.page !== prevState.page) {
//             this.retrieveInventory()
//         }
//     }


//     handlePaginationClick(e) {
//         this.setState({
//             ...this.state,
//             resultsPerPage: Number(e.target.name)
//         })
//     }

//     handleChangePageClick(e) {
//         let page = () => {
//             if (e.target.name === 'previous') {
//                 if (this.state.page - 1 < 0) return 0;
//                 else return this.state.page - 1;
//             } else if (e.target.name === 'next') {
//                 return this.state.page + 1;
//             }
//         }
//         this.setState({
//             ...this.state,
//             page: page()
//         })
//     }

//     render () {

//         const inventory = this.state.inventory.map((item) => {
//             return (
//                 // <InventoryList key={inventory.id} inventory={inventory}/>
//                 <ShowInventory key={item.id} inventory={item}/>
//             )
//         })

//         return (
//             <>
//             <table> 
//                 <thead>
//                     <tr>
//                         <th></th>
//                         <th></th>
//                         <th>UserID</th>
//                         <th>Category</th>
//                         <th>Item</th>
//                         <th>Gender</th>
//                         <th>Age</th>
//                         <th>Description</th>
//                         <th>On-Hand Count</th>
//                         <th>Price Paid</th>
//                         <th>Best Price Paid</th>
//                         <th>Last Purchase Date</th>
//                         <th>Notes</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {inventory}
//                 </tbody>
//                 <tbody>
//                     <tr>
//                         <td colSpan='9' >
//                             <p>
//                                 <button 
//                                     type='button' 
//                                     href='' 
//                                     name='10'
//                                     onClick={e => this.handlePaginationClick(e)}
//                                     >10
//                                 </button>
//                                 <button 
//                                     type='button' 
//                                     href='' 
//                                     name='50'
//                                     onClick={e => this.handlePaginationClick(e)}
//                                     >50
//                                 </button>
//                                 <button 
//                                     type='button' 
//                                     href='' 
//                                     name='100'
//                                     onClick={e => this.handlePaginationClick(e)}
//                                     >100
//                                 </button> Per Page
//                             </p>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td colSpan='9' >
//                             <button 
//                                 type='button'
//                                 name='previous'
//                                 onClick={e => this.handleChangePageClick(e)}
//                                 >Previous Page
//                             </button>
//                             <button 
//                                 type='button'
//                                 name='next'
//                                 onClick={e => this.handleChangePageClick(e)}
//                                 >Next Page
//                             </button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//             </>
//         )
//     }
// }

// const mapStateToProps = (state, ownProps) => {
//     return {
//         jwt: state.jwt
//     }
// }

// export default connect(mapStateToProps)(InventoryList)