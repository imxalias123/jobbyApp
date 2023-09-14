import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Similar = props => {
  const {eachDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,

    rating,
    title,
  } = eachDetails

  return (
    <li className="card-container-s">
      <div>
        <div className="employment-details-s">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="company-logo-s"
          />
          <div className="rating-container-s">
            <h1 className="employment-title-s">{title}</h1>
            <div className="rating-s">
              <AiFillStar className="star-s" />
              <p className="rating-text-s">{rating}</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="description-heading-s">Description</h1>
          <p className="job-description-s">{jobDescription}</p>
        </div>
        <div className="wrap-s">
          <div className="wrap-location-employment-s">
            <div className="location-container-s">
              <MdLocationOn className="location-icon-s" />
              <p className="location-text-s">{location}</p>
            </div>
            <div className="location-container-s">
              <BsFillBriefcaseFill className="location-icon-s" />
              <p className="location-text-s">{employmentType}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default Similar
