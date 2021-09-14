// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filterName, updateRepositoryList, isActive} = props
  const {id, language} = filterName

  const btnClass = isActive ? 'active-btn-language' : 'btn-language'
  const whenItemClicked = () => {
    updateRepositoryList(id)
  }

  return (
    <button
      type="button"
      className={`list-item ${btnClass}`}
      onClick={whenItemClicked}
    >
      {language}
    </button>
  )
}

export default LanguageFilterItem
