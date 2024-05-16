import React from 'react';
import img1 from '../../assets/images/Logo5.jpg';
import img2 from '../../assets/images/E84A1D1B-2A2B-42D1-8CD1-E8D29AECC3A2.jpg';
import img3 from '../../assets/images/22A318F5-D310-4C73-8B95-A4325B515D01.jpg';
import img4 from '../../assets/images/Cover1.png';
import Slider from 'react-slick';

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    variableHeight: true, // Enable variable height for slides
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img src={img1} className='w-100' style={{ height: '300px' }} alt="" /> {/* Set height as per your requirement */}
        </div>
        <div>
          <img src={img2} className='w-100' style={{ height: '300px' }} alt="" />
        </div>
        <div>
          <img src={img3} className='w-100' style={{ height: '300px' }} alt="" />
        </div>
        <div>
          <img src={img4} className='w-100' style={{ height: '300px' }} alt="" />
        </div>
      </Slider>
    </div>
  );
}
