import './index.css';
import { Helmet } from 'react-helmet';

function About() {
  return (
    
    <div>
        <Helmet>
            <title>How It Works - FairwayFinder</title>
        </Helmet>
        <h1>How FairwayFinder Works</h1>
        <div id="site_use"><h2>How to use the site:</h2>
        <p id="about_1">To search for the best deals on golf gear you can type what you are looking for into the search box. Then click the "Go to Golf Deals" button. Then you will be brought to a search results page. On the right you will see product results from across multiple mainstream golf gear stores. On the left is a panel where you can filter and refine your search results. You can look for specific brands, limit to a single category, choose a price range, list results low to high, and vice versa.</p></div>
        <div id="behind_site">
        <h2>How FairwayFinder works behind the scenes:</h2>
        </div>
        
    </div>
  );
}

export default About;