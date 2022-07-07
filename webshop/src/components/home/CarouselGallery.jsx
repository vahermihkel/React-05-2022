import { Carousel } from "react-bootstrap";

function CarouselGallery() {
  const images = [
    {
      src: "https://picsum.photos/id/400/500/300", 
      alt: "First slide", 
      header: "First slide label",
      text: "Nulla vitae elit libero, a pharetra augue mollis interdum"
    },
    {
      src: "https://picsum.photos/id/237/500/300", 
      alt: "Second slide", 
      header: "Second slide label",
      text: "Nulla vitae elit libero, a pharetra augue mollis interdum"
    }
  ];

  return (
    <Carousel>
      { images.map((element, index) => <Carousel.Item key={index}>
        <img src={element.src} alt={element.alt} />
        <Carousel.Caption>
          <h3>{element.header}</h3>
          <p>{element.text}</p>
        </Carousel.Caption>
      </Carousel.Item>)}
    </Carousel>
  )
}

export default CarouselGallery;