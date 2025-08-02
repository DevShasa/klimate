import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { MapPin, RefreshCw, AlertTriangle } from 'lucide-react'
import { useGeoLocation } from '@/hooks/use-geolocation'
import LoadingSkeleton from '@/components/loading-skeleton'
import { useReverseGeocodeQuery, useWeatherQuery, useForecastQuery } from '@/hooks/use-weather'

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

  return (
    <div className='space-y-4'>
      {/* favorite cities */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button 
          variant={'outline'} 
          onClick={handleRefresh} 
          //disabled = {}

          >
          <RefreshCw className='h-4 w-4'/>
        </Button>
      </div>
      {/* current and hourly weather */}
    </div>
  )
}

export default MainDashboard