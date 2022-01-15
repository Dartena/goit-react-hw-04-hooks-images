import PropTypes from "prop-types";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { GalleryImg, GalleryItem } from "../styles/styled";

export default function ImageGalleryItem({ searchResult }) {
  const [loading, setLoading] = useState(true);

  const { webformatURL, largeImageURL } = searchResult;

  return (
    <GalleryItem>
      <GalleryImg
        src={webformatURL}
        data-source={largeImageURL}
        onLoad={() => {
          setLoading(false);
        }}
        style={{ opacity: loading ? 0 : 1 }}
      />
      <Loader loading={loading} size={120} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  searchResult: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
