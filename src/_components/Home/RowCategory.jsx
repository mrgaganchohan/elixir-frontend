import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import {
    fetchPosts,
    fetchProducts,
    fetchSubCategories,
    fetchAllSub, fetchAllCat
} from "../../actions/postActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class RowCategory extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    styles = {
        borderRadius: 50,
        width: 180
    };

    componentDidMount() {
        this.props.fetchAllCat();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.catList !== this.props.catList) {
            this.props.fetchAllCat();
        }

    }

    render() {
        const catArray = this.props.catList;
        return (

            <div className="text-center m-3 mt-4">
                <ButtonGroup className="d-flex justify-content-center">



                    <Dropdown style={{display: "none"}} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret className="m-2" style={{ borderRadius: 50, width: 200 }}>
                            Shop by Category
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Shop Phones</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Shop Watches</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Shop Camera</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Shop Kitchen appliances</DropdownItem>
                            <DropdownItem divider />
                        </DropdownMenu>
                    </Dropdown>


                    <Link to="/category/all" style={this.styles} className=" btn btn-outline-info m-2">Shop all</Link>
                    {catArray.map(category =>
                        <Link to={"/category/"+category.name} style={this.styles} className=" btn-outline-info m-2" >{category.name}</Link>
                    )}
                </ButtonGroup>
            </div>
        );
    }
}

const mapDispatchToProps = {
    fetchPosts,
    fetchProducts,
    fetchSubCategories,
    fetchAllSub, fetchAllCat
};

const mapStateToProps = state => ({
    catList: state.posts.catList
    // subCatDet: state.posts.subCatDet,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RowCategory);
