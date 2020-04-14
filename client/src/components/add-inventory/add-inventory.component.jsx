import React from 'react';
import './add-inventory.styles.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect, Link } from 'react-router-dom';
import { add as jwtAdd } from '../../redux/jwt-verification/actions';
import Modal from '../dialog/dialog.component';

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
            notes: '',
            hasError: false,
            userMessage: '',
            recordInserted: false,
            cancelled: false,
            cleared: false,
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        const { isModalOpen } = this.state;
        this.setState({ isModalOpen: !isModalOpen });
    }

    validateForm() {
        return this.state.category.length > 0 && 
                this.state.itemname.length > 0 &&
                this.state.count.length > 0 &&
                this.state.price.length > 0;
    }

    handleInsert = (event) => {
        event.preventDefault();

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
            if (json.success === false) {
                this.setState({
                    hasError:true,
                    userMessage:json.message
                });
                return false;
            }
            this.setState({
                userMessage:json.message,
                id:json.id,
                recordInserted:true
            })
            this.props.dispatch1(
                json.token, 
                json.id, 
                json.username, 
                json.password);
        }).catch(error => {console.log(error)});
        //this.history.push('/dashboard') DID NOT WORK
        //this.props.push('/dashboard'); DID NOT WORK
        //this.props.history.push('/dashboard'); APPEARED TO WORK BRIEFLY. SAW DASHBOARD THEN WENT TO HOME PAGE
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    handleCancel = (event) => {
        event.preventDefault();
        this.setState({
            category: '',
            itemname: '',
            gender: '',
            age: '',
            description: '',
            count: '',
            price: '',
            bestprice: '',
            lastpurchase: '',
            notes: '',
            cancelled: true
        });
    }

    handleClear = (event) => {
        event.preventDefault();
        this.setState({
            category: '',
            itemname: '',
            gender: '',
            age: '',
            description: '',
            count: '',
            price: '',
            bestprice: '',
            lastpurchase: '',
            notes: '',
            userMessage: '',
            cleared: true
        });
        // console.log('category:',this.state.category);
        // console.log('userMessage:',this.state.userMessage);
    }

    render() {
        console.log('Render Triggered')
        console.log('state:',this.state);
        if (this.state.recordInserted === true) {

            console.log('Record Inserted')
            //return <Redirect to='/dashboard' />
        }

        if (this.state.cancelled === true) {
            console.log('Cancel')
            return <Redirect to='/dashboard' />
        }
        console.log('State checks completed')

        // if (this.state.recordInserted === true) {
        //     return <Redirect to='/dashboard' />
        // }

        // if (this.state.recordInserted === true || this.state.cancelled === true) {
        //     // console.log('state.recordInserted:',this.state.recordInserted);
        //     // console.log('state.cancelled', this.state.cancelled);
        //     return <Redirect to='/dashboard' />
        // }

        return (
            <div className="add-inventory-form-container">
                {/* <form id = 'form-add' className='form-add-inventory' onSubmit={this.handleSubmit}> */}
                <form id = 'form-add' className='form-add-inventory'>
                    <h3>Add Inventory</h3>
                    <h6>Required fields *</h6>
                    <h6 name='userid'>UserID:{this.props.jwt.id}</h6>
                    <br />
                    <input className='category-input'
                        name='category'
                        placeholder='Enter The Item Category *'
                        onChange={this.handleChange}
                        value={this.state.category}
                        label='Primary Category'
                        required
                    />
                    <br />
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
                        placeholder='Enter The Gender'
                        value={this.state.gender}
                        onChange={this.handleChange}
                        label='Gender'
                    />
                    <input className='age-range-input'
                        name='age'
                        placeholder='Enter The Age Range'
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
                    <br />
                    <input className='count-input'
                        name='count'
                        placeholder='Enter The Item Count *'
                        type='number'
                        min='1'
                        step='1'
                        value={this.state.count}
                        onChange={this.handleChange}
                        label='Count'
                        required
                    />
                    <input className='price-input'
                        name='price'
                        placeholder='Enter The Item Price *'
                        type='number'
                        min='0'
                        step='0.01'
                        value={this.state.price}
                        onChange={this.handleChange}
                        label='Price'
                        required
                    />
                    <input className='best-price-input'
                        name='bestprice'
                        placeholder='Enter The Best Price'
                        type='number'
                        min='0'
                        step='0.01'
                        value={this.state.bestprice}
                        onChange={this.handleChange}
                        label='Best Price'
                    />
                    <input className='last-purchase-date-input'
                        name='lastpurchase'
                        // placeholder='Enter the Last Purchase Date'
                        type='date'
                        min='01-01-2000'
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
                    <button type='button' className='add-cancel' onClick={this.handleCancel}>Cancel</button>
                    {/* <button type='reset' className='add-clear' onClick={this.handleClear}>Clear Entry</button> */}
                    <button type='button' className='add-clear' onClick={this.handleClear}>Clear Entry</button>
                    <button type='button' className='add-submit' onClick={this.handleInsert}>Add Item</button>
                    {/* <button className='add-submit'><Modal 
                        isOpen={this.state.isModalOpen} onClose={this.toggleModal}>
                        </Modal>Add Item</button>
                    <br /> */}
                    {/* <button className='add-submit' onClick={this.toggleModal}>TEST DIALOG</button>
                    <Modal isOpen={this.state.isModalOpen} onClose={this.toggleModal}>
                        <div>Howdy Aggies!</div>
                    </Modal> */}
                    <h6>{this.state.userMessage}</h6>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddInventory));