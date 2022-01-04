import { useState, useEffect } from "react";
import { AppDiv } from "./components/styles/styled";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import api from "./helpers/ApiService";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [fullPhotoLink, setFullPhotoLink] = useState("");

  useEffect(() => {
    async function fetchImages() {
      try {
        const imagesData = await api.fetchImages();
        if (imagesData) {
          setSearchResult(imagesData.hits);
        }
        api.incrementPage();
      } catch (error) {}
    }
    fetchImages();
  }, []);

  const loadMore = async () => {
    try {
      const imagesData = await api.fetchImages();
      if (imagesData) {
        setSearchResult((prevState) => [...prevState, ...imagesData.hits]);
        api.incrementPage();
      }
    } catch (error) {}
  };

  const search = async (searchQuery) => {
    api.query = searchQuery.trim();
    api.resetPage();
    if (api.query === "") {
      api.resetPage();
      api.resetQuery();
    }
    try {
      const imagesData = await api.fetchImages();
      if (imagesData) {
        setSearchResult(imagesData.hits);
        api.incrementPage();
      }
    } catch (error) {}
  };

  const openPhoto = (event) => {
    if (!event.target.matches("img")) return;
    setOpenModal(true);
    setFullPhotoLink(event.target.dataset.source);
  };

  const closeModal = () => {
    setOpenModal(false);
    setFullPhotoLink("");
  };

  return (
    <AppDiv>
      <Searchbar onSubmit={search} />
      <ImageGallery searchResult={searchResult} openPhoto={openPhoto} />
      {searchResult.length % api.perPage === 0 && searchResult.length > 0 ? (
        <Button textContent="Load More" onClick={loadMore} />
      ) : (
        ""
      )}
      {openModal ? <Modal imgLink={fullPhotoLink} onClick={closeModal} /> : ""}
    </AppDiv>
  );
}

export default App;
