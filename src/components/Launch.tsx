import { FC } from 'react';
import { Card, Carousel, Image, Space, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useGetRocketQuery } from '../store';
import { getShuffledItems } from '../utils/getters';
import { ILaunch } from 'src/models/launchTypes';
import { Slider } from './Slider';

interface ILaunchProps extends Omit<ILaunch, 'success' | 'date_utc' | 'id'> {
	date: Date;
}

export const Launch: FC<ILaunchProps> = ({ name, date, details, rocket }) => {
	const { data } = useGetRocketQuery(rocket);
	const dateUtc = new Date(date).toUTCString();
	const images = data?.flickr_images && getShuffledItems(data?.flickr_images);

	return (
		<>
			<Card className='card' cover={<Slider alt='spacecraft' images={images} />}>
				<Meta title={name} description={details ?? 'No details about this mission'} />
				<Space size={[0, 8]} wrap style={{ paddingTop: 10 }}>
					<Tag>{dateUtc}</Tag>
					<Tag>
						<a href={data?.wikipedia} target='_blank'>
							{data?.name}
						</a>
					</Tag>
				</Space>
			</Card>
		</>
	);
};
