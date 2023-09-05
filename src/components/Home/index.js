import './index.css'
import Header from '../Header'

const Home = () => (
  <div className="home">
    <Header />
    <div className="home-container">
      <div className="text-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button className="find-jobs" type="button">
          Find Jobs
        </button>
      </div>
    </div>
  </div>
)

export default Home
