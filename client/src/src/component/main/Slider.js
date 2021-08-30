import React from "react"
import Carousel from "react-bootstrap/Carousel"

const sliderGenerator = (img, title, text) => {
	return (
		<Carousel.Item interval={3000}>
			<img className="d-block w-80 mx-auto" src={img} alt="slide" />
		</Carousel.Item>
	)
}

const Slider = () => {
	return (
		<>
			<Carousel>
				{
					//about automation
					sliderGenerator(
						"https://raw.githubusercontent.com/blessingcharles/WigsiFy/main/Images/land1.jpeg"
					)
				}
				{sliderGenerator(
					"https://raw.githubusercontent.com/blessingcharles/WigsiFy/main/Images/land2.jpeg"
				)}

				{sliderGenerator(
					"https://raw.githubusercontent.com/blessingcharles/WigsiFy/main/Images/land3.jpeg"
				)}

				{
					//about javascript
					sliderGenerator(
						"https://raw.githubusercontent.com/blessingcharles/WigsiFy/main/Images/land4.jpeg"
					)
				}
			</Carousel>
		</>
	)
}

export default React.memo(Slider)
