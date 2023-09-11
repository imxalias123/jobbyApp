import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'

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
      <li className="card-container">
        <div className="employment-details">
          <img src={companyLogoUrl} alt="logo" className="company-logo" />
          <div className="rating-container">
            <p>{title}</p>
            <div className="rating">
              <AiFillStar className="star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-container">
          <MdLocationOn className="location-icon" />
          <p>{location}</p>
        </div>
      </li>
    </>
  )
}

export default jobCard
