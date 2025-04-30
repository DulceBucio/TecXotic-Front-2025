import './CopilotMenu.css'

export default function CopilotMenu(){
    const menuPages = [
        {
            name: "CONTROL"
        },
        {
            name: "SETTINGS"
        },
        {
            name: "GALLERY"
        }
    ]

    return(
        <>
            <div className="menu-container">
                <div className="buttons-container">
                    {menuPages.map((button, index) => 
                        <button
                            className="button"
                            key={index}>
                            {button.name}
                        </button>)}
                </div>

            </div>
        </>
    )
}