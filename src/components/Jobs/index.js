import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobCard from '../JobCard'

class Jobs extends Component {
  state = {
    jobsList: [],
  }

  componentDidMount() {
    this.getJobs()
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
      console.log(fetchedData)
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
      this.setState({jobsList: updatedData})
    }
  }

  render() {
    const {jobsList} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div>
            <input placeholder="Search" />
            <ul>
              {jobsList.map(eachJob => (
                <JobCard key={eachJob.id} jobsData={eachJob} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
