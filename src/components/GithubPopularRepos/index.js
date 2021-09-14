import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeId: languageFiltersData[0].id,
    filteredList: [],
  }

  componentDidMount() {
    this.getRespositoriesList()
  }

  getRespositoriesList = async () => {
    const {activeId, filteredList} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))

      this.setState({
        filteredList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="error-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesList = () => {
    const {filteredList} = this.state

    return (
      <ul className="repos-list-section">
        {filteredList.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            repositoryData={eachRepository}
          />
        ))}
      </ul>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  updateRepositoryList = newFilterId => {
    this.setState({activeId: newFilterId}, this.getRespositoriesList)
  }

  render() {
    const {filteredList, activeId} = this.state
    return (
      <div className="app-container">
        <div className="container">
          <h1 className="title">Popular</h1>
          <ul className="menu-list">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                filterName={eachItem}
                key={eachItem.id}
                updateRepositoryList={this.updateRepositoryList}
                isActive={eachItem.id === activeId}
              />
            ))}
          </ul>
          <div>{this.renderApiStatusView()}</div>
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
