import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'
import Similar from '../Similar'

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
        <div className="card-detail-container">
          <div>
            <div className="employment-details-d">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo-d"
              />
              <div className="rating-container-d">
                <h1 className="employment-title-d">{title}</h1>
                <div className="rating-d">
                  <AiFillStar className="star-d" />
                  <p className="rating-text-d">{rating}</p>
                </div>
              </div>
            </div>
            <div className="wrap-d">
              <div className="wrap-location-employment-d">
                <div className="location-container-d">
                  <MdLocationOn className="location-icon-d" />
                  <p className="location-text-d">{location}</p>
                </div>
                <div className="location-container-d">
                  <BsFillBriefcaseFill className="location-icon-d" />
                  <p className="location-text-d">{employmentType}</p>
                </div>
              </div>
              <p className="package-d">{packagePerAnnum}</p>
            </div>
            <hr className="hr-line-dd" />
          </div>
          <div>
            <div className="link-d">
              <h1 className="description-heading-d">Description</h1>
              <a className="anchor" href={companyWebsiteUrl}>
                Visit <BiLinkExternal className="icon-link" />
              </a>
            </div>

            <p className="job-description-d">{jobDescription}</p>
            <h1 className="skill-h1">Skills</h1>
            <ul className="logos-container">
              {skills.map(each => (
                <li className="li-logo" key={each.name}>
                  <img src={each.imageUrl} alt={each.name} className="logos" />
                  <p className="logo-text">{each.name}</p>
                </li>
              ))}
            </ul>
            <div className="life-at-company">
              <div className="width">
                <h1 className="life-h1">Life at Company</h1>
                <p className="life-p">{lifeAtCompany.description}</p>
              </div>

              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="lifeAtCompany-img"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="Similar-jobs-h1">Similar Jobs</h1>
          <ul className="similar-jobs-ul">
            {similarJobs.map(each => (
              <Similar key={each.id} eachDetails={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onClickJobRetry = () => {
    this.getJobsData()
  }

  renderLoading = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />

      <h1 className="failure-view-h1">Oops! Something Went Wrong</h1>
      <p className="failure-view-p">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.onClickJobRetry}
        className="retry-btn"
      >
        Retry
      </button>
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
        <div className="bg-container">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobsDetailsItem
