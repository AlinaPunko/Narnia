import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/common/Icon/icon';

import left from 'styles/icons/left.svg';
import right from 'styles/icons/right.svg';

export default class ImagesSlider extends React.PureComponent {
    static propTypes = {
        images: PropTypes.array.isRequired
    }

    constructor() {
        super();
        this.state = {
            currentImageIndex: 0,
            images: this.props.images
        };
    }

    prevSlide = () => {
        const lastIndex = this.state.images.length - 1;
        const resetIndex = this.state.currentImageIndex === 0;
        const index = resetIndex ? lastIndex : this.state.currentImageIndex - 1;
        this.setState({
            currentImageIndex: index
        });
    }

    nextSlide = () => {
        const lastIndex = this.state.images.length - 1;
        const resetIndex = this.state.currentImageIndex === lastIndex;
        const index = resetIndex ? 0 : this.state.currentImageIndex + 1;
        this.setState({
            currentImageIndex: index
        });
    }

    render() {
        const index = this.state.currentImageIndex;
        let firstFiveImages = this.state.images.slice(index, index + 5);
        if (firstFiveImages.length < 5) {
            firstFiveImages = firstFiveImages.concat(this.state.images.slice(0, 5 - firstFiveImages.length));
        }
        return (
            <div className="imagse-slider">
                <button type="button" className="images-slider__button" onClick={toggleAccountMenuFunction}>
                    <Icon icon={left} iconClassName="images-slider__button-icon" />
                </button>
                {firstFiveImages.map((image, imageIndex) => <img key={imageIndex} src={image} alt="" />)}
                <button type="button" className="images-slider__button" onClick={toggleAccountMenuFunction}>
                    <Icon icon={right} iconClassName="images-slider__button-icon" />
                </button>
            </div>
        );
    }
}
