import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsDetailsItem extends Component {
  state = {
    jobDetailsData: [],
    similarJobs: [],
    apiStatus: 'initial',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = [data.job_details].map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        jobDescription: eachItem.job_description,

        lifeAtCompany: {
          description: eachItem.life_at_company.description,
          imageUrl: eachItem.life_at_company.image_url,
        },
        skills: eachItem.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),

        title: eachItem.title,
      }))

      const updatedSimilarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        jobDescription: eachItem.job_description,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobDetailsData: updatedData,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsSuccess = () => {
    const {jobDetailsData, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      location,
      packagePerAnnum,
      rating,
      jobDescription,
      lifeAtCompany,
      skills,
      title,
    } = jobDetailsData[0]

    return (
      <div>
        <div>
          <div className="employment-details">
            <img src={companyLogoUrl} alt="logo" className="company-logo" />
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
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccess()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobsDetailsItem
