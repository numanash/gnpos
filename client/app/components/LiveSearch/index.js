import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ArrowNavigation, useArrowNavigationWithFocusState } from 'react-arrow-navigation';
import "../../../styles/components/liveSearch.scss";

const NavigationChild = (props) => {
    const {
        focusProps: { ref, tabIndex, onClick },
    } = useArrowNavigationWithFocusState(0, props.index)
    return (
        <li ref={ref} tabIndex={tabIndex} onClick={() => {
            onClick();
            props.onClick(props.id);

        }} className="p-2 search_item"
            onKeyDownCapture={props.onClick}
            datakey={props.id}
        >
            {props.children}
        </li>
    )
}

let selectedLi;
class LiveSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            items: []
        }
    }

    componentDidMount() {
        // window.addEventListener('keydown', this.handleFocus);
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        if (this.props.items !== newProps.items) {
            this.setState({
                items: newProps.items,
                isLoading: false,
                found: newProps.items.length ? true : false
            })
        }
    }


    componentDidUpdate(prevProps) {
    }
    componentWillMount() {
        // window.removeEventListener('keydown', this.handleFocus);
    }
    handleFocus = e => {

        if (this.searchList) {
            if (e.keyCode === 40) {
                if (this.searchList.children) {
                    let childrens = this.searchList.children;

                    // if (selectedLi) {
                    selectedLi.classList.remove('selected');
                    next = selectedLi.next();
                    if (next.length > 0) { }
                    // } else {
                    selectedLi = childrens[0].classList.add("selected")
                    // }s
                }
            } else if (e.keyCode === 38) {

            }
        }
    }

    hideSearchList = e => {
        // if (!this.searchList.classList.contains("d-none")) {
        //     this.searchList.classList.add("d-none");
        // }
    }

    showSearchList = e => {
        // if (this.searchList.classList.contains("d-none")) {
        //     this.searchList.classList.remove("d-none");
        // }
    }

    handleSearch = e => {
        this.setState({
            search: e.target.value,
            isLoading: this.state.search !== "" ? false : true
        }, () => {
            if (this.state.search === "") {
                this.setState({
                    items: [],
                    found: false
                })
            }
            this.props.onSearch(this.state.search);
        });


    }
    onClickItem = e => {
        if (e.keyCode) {
            if (e.keyCode === 13) {
                let items = this.state.items,
                    item = items.find(i => i.id === parseInt(e.target.getAttribute("datakey")));

                if (item) {
                    this.setState({ found: false });
                    this.props.onItemClicked(item);
                }
            }
        } else {

            let items = this.state.items,
                item = items.find(i => i.id === e);

            if (item) {
                this.setState({ found: false });
                this.props.onItemClicked(item);
            }
        }


    }

    render() {
        let parentClass = "live_search position-relative";
        if (this.props.parentClass) {
            parentClass += " " + this.props.className;
        }
        return (<div className={parentClass} onBlur={this.hideSearchList}>
            <ArrowNavigation>
                <div className="search_input">
                    <input type="text" className="live_search form-control" onFocus={this.showSearchList} onChange={this.handleSearch} placeholder={this.props.placeholder ? this.props.placeholder : "Search here"} value={this.state.search} autoFocus={!this.props.autoFocus} tabIndex="1" />
                </div>

                <div className="search_body position-absolute bg-white w-100">
                    {this.state.isLoading ? <div className="p-2">Loading...</div> : <></>}
                    {this.state.found ?
                        <ul className="list-unstyled search_list" tabIndex="2" ref={(ref) => this.searchList = ref}>

                            {this.state.items.map((item, i) => {
                                return (<NavigationChild key={item.id} index={i} id={item.id} data-key={item.id} onClick={this.onClickItem} closeMenu={this.closeMenu} >
                                    {item.value}
                                </NavigationChild>)
                            })}
                        </ul>
                        : <></>}
                </div>
            </ArrowNavigation>

        </div>);
    }
}

LiveSearch.propTypes = {
    parentClass: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    items: PropTypes.array.isRequired
}

export default LiveSearch;