import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import { Input } from 'antd';
import { connect } from 'react-redux'
import { address, addressHelp } from '../../redux/actions/addressAction'
 
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
 
  handleChange = async address => {
    if (address.length > 0) {
      this.setState({ address : address });
    } else {
      this.setState({ address : address });
      this.props.address({address : '', latlong : null})
    }    
  };
 
  handleSelect = async address => {
    this.setState({
        address : address
    })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        (this.props.help) ? 
          this.props.addressHelp({
            'address' : this.state.address, 
            'latlong' : latLng
          })
        : this.props.address({
            'address' : this.state.address, 
            'latlong' : latLng
          })
      })
      .catch(error => console.error('Error', error))
  }

  componentWillUnmount () {
    (this.props.help) ? 
      this.props.addressHelp(null)
    : this.props.address(null)
  }
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder: 'Location name',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                    const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer', borderRadius : '5px' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                            style,
                            })}
                        >
                            <span style={{padding: '0% 3% 0% 3%'}}>{suggestion.description}</span>
                        </div>
                    );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        address : e => dispatch(address(e)),
        addressHelp : e => dispatch(addressHelp(e))
    }

}

export default connect(null, mapDispatchToProps)(LocationSearchInput)