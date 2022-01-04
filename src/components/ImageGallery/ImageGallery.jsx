import PropTypes from "prop-types";
import { GalleryImg, GalleryList, ImageGalleryItem } from "../styles/styled";

export default function ImageGallery({ searchResult, openPhoto }) {
  return (
    <GalleryList onClick={openPhoto}>
      {searchResult.map((result) => (
        <ImageGalleryItem key={result.id}>
          <GalleryImg
            src={result.webformatURL}
            data-source={result.largeImageURL}
          />
        </ImageGalleryItem>
      ))}
    </GalleryList>
  );
}

ImageGallery.propTypes = {
  searchResult: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  openPhoto: PropTypes.func.isRequired,
};
