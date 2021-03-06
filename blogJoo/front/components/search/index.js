import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";

import SearchItems from "./SearchItems";
import { ADD_SEARCH_REQUEST, LOAD_SEARCHS_IP_REQUEST } from "../../reducers/search";
import useInput from "../../hooks/useInput";

const SearchForm = ({ setIsLoading }) => {
  const dispatch = useDispatch();
  const { mainSearchs, addSearchDone, loadSearchsIpDone, loadSearchsLading } = useSelector(state => state.search);

  // const [searchField, setSearchField] = useState("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [searchField, onChangField] = useInput();
  // const [searchField, setSearchField] = useState();
  // const [item, setItem] = useState();

  useEffect(() => {
    if (mainSearchs.length === 0 && !loadSearchsIpDone) {
      dispatch({
        type: LOAD_SEARCHS_IP_REQUEST
      });
    }

    if (addSearchDone) {
      setIsLoading(true);
      Router.replace(`/posts/${searchField}`);
    }

    if (loadSearchsLading) {
      setIsLoading(true);
    }
  }, [addSearchDone, loadSearchsIpDone, mainSearchs, setIsLoading, loadSearchsLading]);

  useEffect(() => {
    if (isFocus) {
      if (filteredDatas.length > 0) {
        setFilteredDatas(() => mainSearchs.filter(item => item.text.toLowerCase().includes(searchField.toLowerCase())));
      } else setFilteredDatas(mainSearchs);
    } else {
      setFilteredDatas([]);
    }
  }, [searchField, mainSearchs, isFocus]);

  // console.log("filteredDatas ", filteredDatas);
  // console.log("datas", datas[0].text.toLowerCase());
  // console.log("searchField", searchField.toLowerCase());
  // console.log("filteredDatas", filteredDatas);

  const handlerFocus = useCallback(
    e => {
      setIsFocus(true);
    },
    [isFocus]
  );

  const handlerOnBlur = useCallback(
    e => {
      setIsFocus(false);
    },
    [isFocus]
  );
  const handlerOnClick = useCallback(
    e => {
      // e.preventDefault();
      // alert("????????????");
      // console.log("searchField ", searchField);
      if (!searchField) return;
      dispatch({
        type: ADD_SEARCH_REQUEST,
        data: { text: searchField }
      });
    },
    [searchField]
  );

  // const onChangHandler = useCallback(
  //   e => {
  //     setSearchField(e.target.value);
  //     // console.log(searchField);
  //   },
  //   [searchField]
  // );

  const handleKeyPress = useCallback(
    e => {
      // console.log("searchField enter", searchField);
      if (isFocus && searchField) {
        if (e.key === "Enter") {
          dispatch({
            type: ADD_SEARCH_REQUEST,
            data: { text: searchField }
          });
        }
      }
    },
    [isFocus, searchField]
  );

  return (
    <>
      <div className="search-form-wrapper">
        <div className="search-form">
          <input
            type="search"
            onFocus={handlerFocus}
            onBlur={handlerOnBlur}
            onKeyPress={handleKeyPress}
            onChange={onChangField}
            value={searchField || ""}
          />
          <button>
            <i className="fa fa-search" aria-hidden="true" onClick={handlerOnClick} />
          </button>
        </div>
        <SearchItems items={filteredDatas} />
      </div>
      <style jsx>{`
        .search-form-wrapper {
          margin-bottom: 70px;
        }

        .search-form-wrapper .search-form input {
          width: 250px;
          height: auto;
          /* ????????? ????????? */
          line-height: normal;
          /* line-height ????????? */
          padding: 0.6em 0.5em;
          /* ????????? ?????? ??????, ????????? ???????????? ????????? ?????? */
          font-family: inherit;
          /* ?????? ?????? */
          border: 1px solid #c9c9c9;
          border-radius: 0;
          /* iSO ??????????????? ?????? */
          outline-style: none;
          /* ???????????? ???????????? ?????? ????????? ???????????? */
          -webkit-appearance: none;
          /* ??????????????? ?????? ???????????? ?????? */
          -moz-appearance: none;
          appearance: none;
        }

        .search-form-wrapper .search-form button {
          border: 1px solid #c9c9c9;
          width: 50px;
          padding: 0.6em 0.5em;
        }

        @media (min-width: 335px) and (max-width: 757px) {
          .search-form-wrapper {
            margin-bottom: 20px;
          }
          .search-form-wrapper .search-form {
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

SearchForm.propTypes = {};

export default SearchForm;
