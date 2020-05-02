import React from 'react';
import PropTypes from 'prop-types';

import './photoSelector.scss';

export default class PhotoSelector extends React.PureComponent {
    static propTypes = {
        onChange: PropTypes.func.isRequired
    }

    changePhoto = (event) => {
        const filesSelected = event.target.files;
        if (filesSelected.length > 0) {
            const fileToLoad = filesSelected[0];
            const fileReader = new FileReader();
            fileReader.onload = (fileLoadedEvent) => {
                const srcData = fileLoadedEvent.target.result;
                this.props.onChange(srcData);
            };
            fileReader.readAsDataURL(fileToLoad);
        }
    }

    render() {
        return (
            <div className="photo-selector">
                <label className="photo-selector__title">Select photo: </label>
                <input
                    name="photo"
                    type="file"
                    className="photo-selector__input"
                    onChange={this.changePhoto}
                    accept="image/x-png,image/gif,image/jpeg"
                />
            </div>
        );
    }
}
