import { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import styles from './SliderGallery.module.scss';
import { bannerDataProps } from '../../../helpers/bannerDataList';

interface SliderGalleryProps {
  bannerData?: bannerDataProps[];
}

const SliderGallery: FC<SliderGalleryProps> = (props) => {
  const { bannerData } = props;
  var sliderSettings = {
    dots: true,
    arrows: false,
    autoplay: true,
  };

      return (
        <Slider {...sliderSettings} className={`${styles['slider']}`}>
          {bannerData!.map((slider) => {
            return (
              <div className={`${styles['image-div']}`} key={slider.id}>
                <img
                  src={slider.banner_image}
                  // onClick={() => openOtherWeb(slider.banner_embedded_link)}
                />
              </div>
            );
          })}
        </Slider>
      );
};

export default SliderGallery;
