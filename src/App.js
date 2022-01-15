import { useState, useEffect } from "react";
import { AppDiv, Overlay } from "./components/styles/styled";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import api from "./helpers/ApiService";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader/Loader";

function App() {
  const [searchQuery, setSearchQuery] = useState(api.query);
  const [searchResult, setSearchResult] = useState([]);
  const [savedSearchQuery, setSavedSearchQuery] = useState("");
  const [savedPage, setSavedPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [fullPhotoLink, setFullPhotoLink] = useState("");
  const [hideLoadMoreBtn, setHideLoadMoreBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSavedSearchQuery(api.query);
    setSavedPage(api.page);
  }, []);
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  async function fetchImages() {
    if (api.query === "cats" && searchQuery.trim() === "") {
      return toast.warn("Please enter a keyword to search!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    api.query = searchQuery.trim();
    api.resetPage();

    if (api.query === "") {
      api.resetPage();
      api.resetQuery();
    }
    try {
      setLoading(true);
      const imagesData = await api.fetchImages();
      if (imagesData.hits.length > 0) {
        api.incrementPage();
        setSearchResult(imagesData.hits);
        setSavedSearchQuery(api.query);
        setSavedPage(api.page);
        setHideLoadMoreBtn(false);
      }
      if (imagesData.hits.length === 0) {
        toast.error("Nothing to found! Please enter correct search query.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        api.query = savedSearchQuery;
        api.page = savedPage;
        return;
      }
      if (imagesData.hits.length < api.perPage) {
        setHideLoadMoreBtn(true);
      }
    } catch (error) {
    } finally {
      onLoadHandle();
    }
  }

  const loadMore = async () => {
    try {
      setLoading(true);
      const imagesData = await api.fetchImages();
      if (imagesData.hits.length > 0) {
        api.incrementPage();
        setSearchResult([...searchResult, ...imagesData.hits]);
        setSavedPage(api.page);
      }
      if (imagesData.hits.length < api.perPage) {
        setHideLoadMoreBtn(true);
      }
    } catch (error) {
    } finally {
      setLoading(false);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const openPhoto = (event) => {
    if (!event.target.matches("img")) return;

    setOpenModal(true);
    setFullPhotoLink(event.target.dataset.source);
    setLoading(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setFullPhotoLink("");
  };
  const onLoadHandle = () => {
    setLoading(false);
  };

  return (
    <AppDiv>
      <Searchbar onSubmit={setSearchQuery} />
      <Overlay style={{ display: loading ? "flex" : "none" }}>
        <Loader loading={loading} size={500} />
      </Overlay>
      <ImageGallery
        searchResult={searchResult}
        openPhoto={openPhoto}
        loading={loading}
      />
      {hideLoadMoreBtn || <Button textContent="Load More" onClick={loadMore} />}

      <ToastContainer theme="colored" />
      {!openModal || (
        <Modal
          closeModalHandle={closeModal}
          loading={loading}
          imgLink={fullPhotoLink}
          loaderSize={400}
          onLoad={onLoadHandle}
        />
      )}
    </AppDiv>
  );
}

export default App;
