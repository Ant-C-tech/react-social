import './styles.css';
import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

export const NewsCardSkeleton = ({ skeletons }) => {
  return Array(skeletons)
    .fill(0)
    .map((_, index) => (
      <div className='news-card-skeleton' key={index}>
        <div className='news-card-skeleton-header'>
          <div className='news-card-skeleton-category'>
            <Skeleton />
          </div>
          <div className='news-card-skeleton-country'>
            <Skeleton />
          </div>
        </div>

        <div className='news-card-skeleton-title'>
          <div className='news-card-skeleton-title-first-line'>
            <div className='news-card-skeleton-title-icon'>
              <Skeleton />
            </div>
            <div className='news-card-skeleton-title-icon-text'>
              <Skeleton />
            </div>
          </div>
          <div className='news-card-skeleton-title-text'>
            <Skeleton />
          </div>
        </div>

        <div className='news-card-skeleton-img'>
          <Skeleton height={150} />
        </div>

        <div className='news-card-skeleton-description'>
          <Skeleton count={4} />
        </div>

        <div className='news-card-skeleton-controls'>
          <div className='news-card-skeleton-read-more'>
            <Skeleton height={40} />
          </div>

          <div className='news-card-skeleton-go-to-source'>
            <div className='news-card-skeleton-go-to-source-icon'>
              <Skeleton />
            </div>
            <div className='news-card-skeleton-go-to-source-text'>
              <Skeleton />
            </div>
          </div>

          <div className='news-card-skeleton-read-later'>
            <Skeleton height={40} />
          </div>
        </div>

        <div className='news-card-skeleton-footer'>
          <div className='news-card-skeleton-data'>
            <Skeleton />
          </div>
          <div className='news-card-skeleton-author'>
            <Skeleton />
          </div>
        </div>
      </div>
    ));
};
