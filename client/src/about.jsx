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
        <p id="about_1">To search for the best deals on golf gear you can type what you are looking for into the search box.</p><img style="width:600px;" src="assets/searchbox.png"/><p id="about_1">Then click the "Go to Golf Deals" button. Then you will be brought to a search results page.</p><img style="width:300px;" src="assets/gotogolfbutton.png"/><p id="about_1"> On the right you will see product results from across multiple mainstream golf gear stores.</p><img style="width:600px;" src="assets/results.png"/><p  id="about_1">On the left is a panel where you can filter and refine your search results. You can look for specific brands, limit to a single category, choose a price range, list results low to high, and vice versa.</p><img style="width:300px;" src="assets/filterpane.png"/><p id="about_1"> All search results have the products price, brand name, and a link to the seller's website. Once you go to the website you can compare the prices FairwayFinder pulls to the real price. This is because sometimes we get incorrect results due to our data pipeline using Optical Character Recognition and Generative AI.</p><img src="assets/linktosellersite.png"/></div>
        
        </div>
        
        
    
  );
}

export default About;