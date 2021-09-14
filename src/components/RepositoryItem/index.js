// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props
  const {
    avatarUrl,
    forksCount,
    id,
    issuesCount,
    name,
    starsCount,
  } = repositoryData
  return (
    <li className="card">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h3 className="repos-name">{name}</h3>
      <div className="group">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="group">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="group">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open-issues"
          className="icons"
        />
        <p>{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
