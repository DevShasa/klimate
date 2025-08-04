import type { ForecastData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"


interface HourlyTemperatureProps{
    data: ForecastData
}

const HourlyTemperature = ({data}:HourlyTemperatureProps) => {
  return (
    <Card className="flex-1">
        <CardHeader>
            <CardTitle>
                Today's Temperature
            </CardTitle>
        </CardHeader>
        <CardContent>
            
        </CardContent>
    </Card>
  )
}

export default HourlyTemperature