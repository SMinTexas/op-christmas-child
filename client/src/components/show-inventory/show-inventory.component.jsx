import React from 'react';
import './show-inventory.styles.scss';
import { FaChevronRight } from "react-icons/fa";

export default class ShowInventory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: false
        }
    }

    handleRowClick(e) {
        this.setState({
            ...this.state,
            isExpanded: !this.state.isExpanded
        })
    }

    // handleUpdateRequest(e) {
    //     this.setState({
    //         ...this.state
    //     })
    // }

    render() {
        // console.log('category: ',this.props.inventory.category)
        // console.log('itemName: ',this.props.inventory.item_name)
        // console.log('gender: ',this.props.inventory.gender)
        // console.log('age: ',this.props.inventory.age_range)
        // console.log('description: ',this.props.inventory.description)
        // console.log('count: ',this.props.inventory.count)
        // console.log('price: ',this.props.inventory.price)
        // console.log('best price: ',this.props.inventory.best_price)
        // console.log('notes: ',this.props.inventory.notes)

        const lastPurchaseDate = new Date(
            this.props.inventory.last_purchase_dt).toLocaleDateString()

        // var itemStats = this.props.inventory.item_name + ' : ' +
        //                 this.props.inventory.description + ' - Current Count: ' +
        //                 this.props.inventory.count + ' @ $' +
        //                 this.props.inventory.price

        // var age = ''
        // if (this.props.inventory.age_range === null || 
        //     this.props.inventory.age_range === '') {
        //         age = 'Intended for children of any age and, if applicable, for '
        //     }
        // else {
        //     age = 'Intended for children aged between ' + 
        //             this.props.inventory.age_range + ' and, if applicable, for '
        // }

        // var gender = ''
        // if (this.props.inventory.gender === 'Boys' ||
        //     this.props.inventory.gender === 'Girls') {
        //     gender = this.props.inventory.gender
        // }
        // else {
        //     gender = 'all children'
        // }

        // var historicalStats = ''
        // if (this.props.inventory.last_purchase_dt !== null) {
        //     historicalStats = 'Last purchased : ' + lastPurchaseDate
        // }
        // if (this.props.inventory.best_price !== null) {
        //     historicalStats += ' Best price paid : ' + this.props.inventory.best_price
        // }
        // var itemNotes = ''
        // if (this.props.inventory.notes === null || this.props.inventory.notes === '') {
        //     itemNotes = ''
        // }
        // else {
        //     itemNotes = ' Notes on this purchase: ' + this.props.inventory.notes
        // }

        const ExpandedPane = ((props) => {
            if (props.isExpanded) {
                return (
                    <tr>
                        <td colSpan='9' >
                            <div>
                                <h4>
                                    {props.inventory.category}
                                </h4>
                                <div>
                                    {/* <button 
                                        type='button' 
                                        name='update'
                                        onClick={e => this.handleUpdateRequest(e)}>
                                        UPDATE
                                    </button> */}
                                    {/* <h5>
                                        {itemStats}
                                    </h5>
                                    <h5>
                                        {age}{gender}
                                    </h5>
                                    <h5>
                                        {historicalStats}{itemNotes}
                                    </h5> */}
                                    <p>
                                        
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                )
            }
            else return null
        })

        return (
            <React.Fragment>
                <tr 
                    className="inventory-row" 
                    onClick={e => this.handleRowClick(e)}
                >
                <td>
                    {/* <button type='button' name='down' onClick={e => this.handleRowClick(e)}><i className="fas fa-chevron-right"></i></button> */}
                    <FaChevronRight size={10} color="red" />
                </td>
                <td>
                    <p></p>
                </td>
                {/* <td>{this.props.inventory.userid}</td> */}
                <td>
                    {this.props.inventory.category}
                </td>
                <td>
                    {this.props.inventory.item_name}
                </td>
                <td>
                    {this.props.inventory.gender}
                </td>
                <td>
                    {this.props.inventory.age_range}
                </td>
                <td>
                    {this.props.inventory.description}
                </td>
                <td>
                    {this.props.inventory.count}
                </td>
                <td>
                    {this.props.inventory.price}
                </td>
                <td>
                    {this.props.inventory.best_price}
                </td>
                <td>
                    {lastPurchaseDate}
                </td>
                <td>
                    {this.props.inventory.notes}
                </td>
            </tr>
            <ExpandedPane inventory={this.props.inventory} isExpanded={this.state.isExpanded} />
            </React.Fragment>
        )
    }
}