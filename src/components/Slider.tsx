import { FC } from 'react';
import { Carousel, Image } from 'antd';

interface ISliderProps {
	images: string[];
	alt: string;
}

export const Slider: FC<ISliderProps> = ({ alt = 'image', images }) => {
	const imageElements = images?.map((image, index) => (
		<Image key={index} src={image} alt={alt} />
	));

	return <Carousel autoplay>{imageElements}</Carousel>;
};
