import './TopHeader.css'

function TopHeader() {

    return (
        <>
            <header className="top-header">
                <div className="left-menu">
                    <img className="US-flag" src="../src/assets/icons/header/US.png" alt=""/>

                    <a href="#">US</a>
                    <span>|</span>

                    <img className="location-pin" src="../src/assets/icons/header/location-pin.svg" alt=""/>
                    <a href="#">Select a Store</a>
                    <span>|</span>

                    <img className="recycle-icon" src="../src/assets/icons/header/recycle-icon.svg" alt=""/>
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
