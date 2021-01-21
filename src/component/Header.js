import PropTypes from 'prop-types';
import Button from './Button'
import {useLocation} from 'react-router-dom'
const Header = ({title,onAdd,showAdd}) => {
    const location = useLocation()
    return (
        <header className='header'>
            <div  >{title}</div>
           {location.pathname==='/' && <Button onClick={onAdd} color={showAdd ? 'red':'green'} text={showAdd ? 'close':'add'}/>}
        </header>
    )
};

Header.defaultProps = {
    title: 'task tracker'
}

Header.propTypes={title:PropTypes.string.isRequired}
// const headingStyle={
//     color: 'red',
//     backgroundColor: 'black'
// }
export default Header
