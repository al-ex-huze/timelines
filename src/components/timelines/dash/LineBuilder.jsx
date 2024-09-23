import * as React from "react";
import { getFeels } from "../../../../api";

import CircularLoader from "../../CircularLoader";
import LineChart from "./LineChart";

const LineConstructor = ({ setLineChartSelectedWeek }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [feelsData, setFeelsdata] = React.useState([]);

    React.useEffect(() => {
        console.log("LineFeels UseEffect()");
        setIsLoading(true);
        getFeels()
            .then((feels) => {
                setFeelsdata(feels);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (isLoading) return <CircularLoader />;
    return (
        <LineChart
            feelsData={feelsData}
            setLineChartSelectedWeek={setLineChartSelectedWeek}
        />
    );
};

export default LineConstructor;
