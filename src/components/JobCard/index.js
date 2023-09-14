import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const jobCard = props => {
  const {jobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsData
  return (
    <>
      <Link to={`/jobs/${id}`} className="link">
        <li className="card-container">
          <div>
            <div className="employment-details">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
              <div className="rating-container">
                <h1 className="employment-title">{title}</h1>
                <div className="rating">
                  <AiFillStar className="star" />
                  <p className="rating-text">{rating}</p>
                </div>
              </div>
            </div>
            <div className="wrap">
              <div className="wrap-location-employment">
                <div className="location-container">
                  <MdLocationOn className="location-icon" />
                  <p className="location-text">{location}</p>
                </div>
                <div className="location-container">
                  <BsFillBriefcaseFill className="location-icon" />
                  <p className="location-text">{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr className="hr-line" />
          </div>
          <div>
            <h1 className="description-heading">Description</h1>
            <p className="job-description">{jobDescription}</p>
          </div>
        </li>
      </Link>
    </>
  )
}

export default jobCard
