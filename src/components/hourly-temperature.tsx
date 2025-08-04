import type { ForecastData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {format} from "date-fns"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HourlyTemperatureProps{
    data: ForecastData
}


interface ChartData{
  time:string; 
  temp: number;
  feels_like: number
}



const HourlyTemperature = ({data}:HourlyTemperatureProps) => {


  const transformedChartData:ChartData[] = data
    .list
    .slice(0,8)
    .map(item=>({
        // convert date into unix timestamp and then give in hours and AM/PM
        time:format(new Date(item.dt *1000), "ha"),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
    }))



  console.log("CHART DATA FOR FORECAST ->", transformedChartData)

  return (
    <Card className="flex-1">
        <CardHeader>
            <CardTitle>
                Today's Temperature
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transformedChartData}>
                    <XAxis
                      dataKey="time"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}°`}
                    />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="feels_like"
                    stroke="#64748b"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5"
                  />
                  <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Temperature
                              </span>
                              <span className="font-bold">
                                {payload[0].value}°
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Feels Like
                              </span>
                              <span className="font-bold">
                                {payload[1].value}°
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                </LineChart>
              </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  )
}

export default HourlyTemperature 