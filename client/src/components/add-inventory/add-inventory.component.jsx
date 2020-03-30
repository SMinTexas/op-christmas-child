import React from 'react';
import './add-inventory.styles.scss';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
import { add as jwtAdd } from '../../redux/jwt-verification/actions';

class AddInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.jwt.id,
            category: '',
            itemname: '',
            gender: '',
            age: '',
            description: '',
            count: '',
            price: '',
            bestprice: '',
            lastpurchase: '',
            notes: ''
        }
    }

    validateForm() {
        return this.state.category.length > 0 && 
                this.state.itemname.length > 0 &&
                this.state.count.length > 0 &&
                this.state.price.length > 0;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        fetch('/inventories/add', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userid: this.state.userid,
                category: this.state.category,
                itemname: this.state.itemname,
                gender: this.state.gender,
                age: this.state.age,
                description: this.state.description,
                count: this.state.count,
                price: this.state.price,
                bestprice: this.state.bestprice,
                lastpurchase: this.state.lastpurchase,
                notes: this.state.notes
            }),
        })
        .then(response => response.json())
        .then(json => {
            if (json.err) {
                //this.setState({hasError:true,userMessage:json.error});
                return false;
            }
            //this.setState({userMessage:json.message,id:json.id})
            this.props.dispatch1(json.token, json.id, json.username, json.password);
        }).catch(error => {console.log(error)});
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="add-inventory-form-container">
                <form className='form-add-inventory' onSubmit={this.handleSubmit}>
                    <h3>Add Inventory</h3>
                    <h6>Required fields *</h6>
                    <h6 name='userid'>UserID:{this.props.jwt.id}</h6>
                    <hr />
                    <input className='category-input'
                        name='category'
                        placeholder='Enter The Item Category *'
                        onChange={this.handleChange}
                        value={this.state.category}
                        label='Primary Category'
                        required
                    />
                    <hr />
                    <input className='item-name-input'
                        name='itemname'
                        placeholder='Enter The Item Name *'
                        value={this.state.itemname}
                        onChange={this.handleChange}
                        label='Item Name'
                        required
                    />
                    <input className='gender-input'
                        name='gender'
                        placeholder='Enter The Gender For This Item'
                        value={this.state.gender}
                        onChange={this.handleChange}
                        label='Gender'
                    />
                    <input className='age-range-input'
                        name='age'
                        placeholder='Enter The Age Range For This Item'
                        value={this.state.age}
                        onChange={this.handleChange}
                        label='Age'
                    />
                    <br />
                    <input className='description-input'
                        name='description'
                        placeholder='Enter The Item Description'
                        value={this.state.description}
                        onChange={this.handleChange}
                        label='Description'
                    />
                    <hr />
                    <input className='count-input'
                        name='count'
                        placeholder='Enter The Item Count *'
                        value={this.state.count}
                        onChange={this.handleChange}
                        label='Count'
                        required
                    />
                    <input className='price-input'
                        name='price'
                        placeholder='Enter The Item Price *'
                        value={this.state.price}
                        onChange={this.handleChange}
                        label='Price'
                        required
                    />
                    <br />
                    <input className='best-price-input'
                        name='bestprice'
                        placeholder='Enter The Best Price For This Item'
                        value={this.state.bestprice}
                        onChange={this.handleChange}
                        label='Best Price'
                    />
                    <input className='last-purchase-date-input'
                        name='lastpurchase'
                        value={this.state.lastpurchase}
                        onChange={this.handleChange}
                        label='Last Purchase Date'
                    />
                    <br />
                    <input className='notes-input'
                        name='notes'
                        placeholder='Enter Any Notes For This Item'
                        value={this.state.notes}
                        onChange={this.handleChange}
                        label='Notes'
                    />
                    <button className='cancel'>Cancel</button>
                    <button className='submit'>Add Item</button>
                </form>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    console.log('state.jwt',state.jwt)
    return {
        jwt: state.jwt
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch1: (token, id, username) => {
            dispatch(jwtAdd(token, id, username))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInventory);