import './Search.css'

//hooks
import {useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponent'

//components
import LikeContainer from '../../components/LikeContainer'
import PhotoItem from '../../components/PhotoItem'
import { Link } from 'react-router-dom'


//Redux
import { useQuery } from '../../hooks/useQuery'

const Search = () => {
  return (
    <div>Search</div>
  )
}

export default Search