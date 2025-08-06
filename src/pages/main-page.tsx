import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { MapPin, RefreshCw, AlertTriangle } from 'lucide-react'
import { useGeoLocation } from '@/hooks/use-geolocation'
import LoadingSkeleton from '@/components/loading-skeleton'
import { useReverseGeocodeQuery, useWeatherQuery, useForecastQuery } from '@/hooks/use-weather'
import CurrentWeather from '@/components/current-weather'
import HourlyTemperature from '@/components/hourly-temperature'
import WeatherDetails from '@/components/weather-details'
import { WeatherForecast } from '@/components/weather.forecast'

const MainDashboard = () => {

  const {coordinates,  error:locationError, isLoading:locationLoading, getLocation} = useGeoLocation()

  const locationQuery = useReverseGeocodeQuery(coordinates)
  const weatherQuery = useWeatherQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)



  const handleRefresh = ()=>{
    getLocation()
    if(coordinates){
      weatherQuery.refetch()
      forecastQuery.refetch()
      locationQuery.refetch()
    }
  }

  console.log("COORDINATES ---->", coordinates) 

  if(locationLoading){
    return <LoadingSkeleton />
  }

  if(!coordinates){
    return (
      <Alert variant="destructive">
      <AlertTitle>Location required</AlertTitle>
      <AlertDescription className='flex flex-col gap-4'>
        <p>Please enable location access to see your local weather</p>
        <Button onClick={getLocation} variant={'outline'} className='w-fit'>
          <MapPin className='mr-2 h-4 w-4'/>
          Enable Location 
        </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if(locationError){
    return (
      <Alert variant="destructive">
      <AlertTriangle className='h-4 w-4' />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className='flex flex-col gap-4'>
        <p>{locationError}</p>
        <Button onClick={getLocation} variant={'outline'} className='w-fit'>
          <MapPin className='mr-2 h-4 w-4'/>
          Enable Location
        </Button>
        </AlertDescription>
      </Alert>
    )
  }



  if(weatherQuery.error || forecastQuery.error){
    return(
      <Alert variant="destructive">
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Failed to fetch weather data, please try again</p>
          <Button onClick={handleRefresh} variant={'outline'} className='w-fit'>
            <RefreshCw className='mr-2 h-4 w-4'/>
            Retry
          </Button>
          </AlertDescription>
      </Alert>
    )
  }

  if(!weatherQuery.data || !forecastQuery.data){
    return <LoadingSkeleton />
  }

  const locationName = locationQuery.data?.[0]


  return (
    <div className='space-y-4'>
      {/* favorite cities */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button 
          variant={'outline'} 
          onClick={handleRefresh} 
          disabled = {weatherQuery.isFetching || forecastQuery.isFetching}

          >
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`}/>
        </Button>
      </div>



      <div className='grid gap-6'>
        <div className='flex flex-col lg:flex-row gap-4'>
            <CurrentWeather data={weatherQuery.data} locatioName={locationName}/>
            <HourlyTemperature data={forecastQuery.data}/>
        </div>
        <div className={'grid gap-6 md:grid-cols-2 items-start'}>
          {/* details */}
          <WeatherDetails data={weatherQuery.data}/>

          {/* Forecast */}
          <WeatherForecast data={forecastQuery.data} />

        </div>
      </div>
    </div>
  )
}

export default MainDashboard