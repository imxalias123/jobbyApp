import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobCard from '../JobCard'

const apiJobStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileData: [],
    jobsList: [],
    responseStatus: false,
    apiStatus: apiStatusConstants.initial,
    apiJobStatus: apiJobStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = [await response.json()]

      const updatedData = fetchedData.map(each => ({
        name: each.profile_details.name,
        profileImageUrl: each.profile_details.profile_image_url,
        shortBio: each.profile_details.short_bio,
      }))
      console.log(updatedData)
      this.setState({
        profileData: updatedData,
        responseStatus: true,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiJobStatusConstants.failure,
      })
    }
  }

  getJobs = async () => {
    const apiUrl = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiJobStatus: apiJobStatusConstants.success,
      })
    } else {
      this.setState({
        apiJobStatus: apiJobStatusConstants.failure,
      })
    }
  }

  getProfileData = () => {
    const {profileData, responseStatus} = this.state

    if (responseStatus) {
      const {name, profileImageUrl, shortBio} = profileData[0]
      return (
        <div className="profile-container">
          <img src={profileImageUrl} alt="profile" className="profile-img" />
          <h1 className="profile-heading">{name}</h1>
          <p className="short-bio">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  getJobsData = () => {
    const {jobsList} = this.state
    return (
      <div>
        <ul className="unordered-list">
          {jobsList.map(eachJob => (
            <JobCard key={eachJob.id} jobsData={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobStatus = () => {
    const {apiJobStatus} = this.state

    switch (apiJobStatus) {
      case apiJobStatusConstants.success:
        return this.getJobsData()
      case apiJobStatusConstants.failure:
        return this.getFailureJobsListView()
      case apiJobStatusConstants.loading:
        return this.getLoadingView()
      default:
        return null
    }
  }

  renderProfileStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getProfileData()
      case apiStatusConstants.failure:
        return this.getFailureProfileView()
      case apiStatusConstants.loading:
        return this.getLoadingView()
      default:
        return null
    }
  }

  getCheckboxInput = () => (
    <ul className="checkbox-container">
      {employmentTypesList.map(eachItem => (
        <li className="checkbox-li" key={eachItem.employmentTypeId}>
          <input type="checkbox" id={eachItem.employmentTypeId} />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  getRadioInput = () => (
    <ul className="radio-container">
      {salaryRangesList.map(eachItem => (
        <li className="radio-li" key={eachItem.salaryRangeId}>
          <input type="radio" id={eachItem.salaryRangeId} />
          <label className="label" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="search-container">
            <input type="search" placeholder="Search" className="search-bar" />
            <button type="button" className="search-btn">
              <BsSearch className="search-icon" />
            </button>
          </div>

          <div>
            <div className="side-container">
              {this.renderProfileStatus()}
              <hr className="hr-line" />
              <h1 className="type-employment">Type of Employment</h1>
              {this.getCheckboxInput()}
              <hr className="hr-line" />
              <h1 className="type-employment">Salary Range</h1>
              {this.getRadioInput()}
            </div>
          </div>
          <div>{this.renderJobStatus()}</div>
        </div>
      </>
    )
  }
}

export default Jobs
