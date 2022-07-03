import 'react-loading-skeleton/dist/skeleton.css'

import './newsCardSkeleton.css';

import Skeleton from 'react-loading-skeleton'

export const NewsCardSkeleton = ({ skeletons }) => {
	return (
		Array(skeletons).fill(0).map((_, index) =>
			<div className="news-skeleton" key={index}>
				<div className="news-skeleton-header">
					<div className="news-skeleton-category">
						<Skeleton />
					</div>
					<div className="news-skeleton-country">
						<Skeleton />
					</div>
				</div>

				<div className="news-skeleton-title">
					<div className="news-skeleton-title-first-line" >
						<div className="news-skeleton-title-icon">
							<Skeleton />
						</div>
						<div className="news-skeleton-title-icon-text">
							<Skeleton />
						</div>
					</div>
					<div className="news-skeleton-title-text">
						<Skeleton />
					</div>
					<div className="news-skeleton-title-text">
						<Skeleton />
					</div>
				</div>

				<div className="news-skeleton-img">
					<Skeleton height={150} />
				</div>

				<Skeleton count={3} />
				<div className="news-skeleton-read-more">
					<div className="news-skeleton-read-more-icon">
						<Skeleton />
					</div>
					<div className="news-skeleton-read-more-text">
						<Skeleton />
					</div>
				</div>

				<div className="news-skeleton-footer">
					<div className="news-skeleton-data">
						<Skeleton />
					</div>
					<div className="news-skeleton-author">
						<Skeleton />
					</div>
				</div>
			</div>
		)
	)
};
