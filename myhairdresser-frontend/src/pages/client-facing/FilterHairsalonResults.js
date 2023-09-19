import { useLocation } from 'react-router-dom';

function FilterHairsalonResults() {
    
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access specific query parameters
  const param1 = queryParams.get('name');
  
  return (
    <div>
      <p>param1: {param1}</p>
      
    </div>
  );
}

export default FilterHairsalonResults;
