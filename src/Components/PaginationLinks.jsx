import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({ nextPage, prevPage }) => {
  const navigate = useNavigate();
  return <div className="pagination" aria-label="Page navigation">
    <button onClick={() => navigate(prevPage)} className="pagination-buttonSecond" aria-label="Previous page"><ArrowLeft size={17} /></button>
    <button onClick={() => navigate(nextPage)} className="pagination-button" aria-label="Next page"><ArrowRight size={17} /></button>
  </div>;
};

Pagination.propTypes = {
  nextPage: PropTypes.string.isRequired,
  prevPage: PropTypes.string.isRequired,
};

export default Pagination;
