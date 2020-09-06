import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Configure, Pagination } from 'react-instantsearch-dom';
import MentorCard from './MentorCard';
import MentorRequestFrame from './MentorRequestFrame.js';
import Modal from '../../components/Modal';

import './MentorSearch.css';

const ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;
const ALGOLIA_APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
const ALGOLIA_INDEX_NAME = process.env.REACT_APP_ALGOLIA_INDEX_NAME;
const searchClient = algoliasearch(ALGOLIA_APP_ID,ALGOLIA_API_KEY);

const Hit = ({hit}) => (
    <Modal title={hit.name} key={hit._id} trigger={<div><MentorCard mentor={hit}/></div>}>
        <MentorRequestFrame mentor={hit}/>
    </Modal>
);



const MentorSearch = () => (
    <div className="ais-InstantSearch">
        <InstantSearch
                indexName={ALGOLIA_INDEX_NAME}
                searchClient={searchClient}
            >
                <Configure hitsPerPage={10}/>
                <div
                    style={ { borderRadius: '0px 0px 5px 5px' }}
                    className="container hits-container"
                >
                    <div className="hit-actions">
                     <SearchBox
                        translations={{
                            placeholder: 'Search into our products: phones, tv...',
                        }}
                        />
                    </div>
                    <Hits hitComponent={Hit}/>
                    <div className="hit-pagination">
                      <Pagination showLast={true} />
                    </div>
                </div>
            </InstantSearch>
    </div>
    
);


export default MentorSearch;