import './TopHeader.css'

// SVG
import usFlag from '../../assets/icons/header/US.png';
import locationPin from '../../assets/icons/header/location-pin.svg';
import recycleIcon from '../../assets/icons/header/recycle-icon.svg';

function TopHeader() {

    return (
        <>
            <header className="top-header">
                <div className="left-menu">
                    <img className="US-flag" src={usFlag} alt=""/>

                    <a href="#">US</a>
                    <span>|</span>

                    <img className="location-pin" src={locationPin} alt=""/>
                    <a href="#">Select a Store</a>
                    <span>|</span>

                    <img className="recycle-icon" src={recycleIcon} alt=""/>
                    <a href="#">Reconsidered</a>
                </div>

                <div className="right-menu">
                    <a href="#">English</a>
                    <span>|</span>
                    <a href="#">Help</a>
                </div>
            </header>

        </>
    )
}

export default TopHeader
