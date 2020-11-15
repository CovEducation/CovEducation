import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  connectSearchBox,
  PoweredBy,
  RefinementList,
  connectPagination,
} from "react-instantsearch-dom";
import MentorHits from "./MentorGrid";
import TextField from "@material-ui/core/TextField";
import MdPagination from "@material-ui/lab/Pagination";
import styled from "styled-components";
import MentorFilters from "./MentorFilters";
import { Grid } from "@material-ui/core";

const ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;
const ALGOLIA_APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
const ALGOLIA_INDEX_NAME = process.env.REACT_APP_ALGOLIA_INDEX_NAME;
const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => {
  return (
    <TextField
      id="search-bar"
      label="Search"
      variant="filled"
      value={currentRefinement}
      onChange={(e) => refine(e.currentTarget.value)}
      InputProps={{
        endAdornment: <PoweredBy />,
      }}
      fullWidth
    />
  );
});

// TODO center pagination
const Pagination = connectPagination(
  ({ currentRefinement, nbPages, refine }) => {
    const handleChange = (e, selectedPage) => {
      e.preventDefault();
      refine(selectedPage);
    };

    return (
      <MdPagination
        count={nbPages}
        page={currentRefinement}
        onChange={handleChange}
        color="primary"
      />
    );
  }
);

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
`;

const MentorSearch = () => (
  <div className="ais-InstantSearch">
    <InstantSearch indexName={ALGOLIA_INDEX_NAME} searchClient={searchClient}>
      <Grid container justify="center" spacing={0}>
      <Configure hitsPerPage={12} />
      <SearchBox />
      {/* <MentorHits />
          <PaginationContainer>
            <Pagination showLast={true} />
          </PaginationContainer> */}
        <Grid item xs={3}>
          <MentorFilters attribute="tags" />
        </Grid>
        <Grid item xs={9}>
          <MentorHits />
          <PaginationContainer>
            <Pagination showLast={true} />
          </PaginationContainer>
        </Grid>
      </Grid>
    </InstantSearch>
  </div>
);

export default MentorSearch;
