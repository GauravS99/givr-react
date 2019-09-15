import * as React from "react";
import UploadProfiles from "./UploadProfiles";
import RatingComponent from "./RatingComponent";

class AppBody extends React.Component {
    render() {
        return (
            <div className="text-center mt-4 flex flex-column">
                <UploadProfiles />
                <RatingComponent/>
            </div>
        );
    }
}

export default AppBody;
