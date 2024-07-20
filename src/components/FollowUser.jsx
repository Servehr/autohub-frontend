import { Icons } from '@/util/icon'
import { useEffect, useState } from 'react'
import './css/stepper.css'
import { AVATAR } from '@/lib/axios'
import { followUser, getUserFollowers } from '@/apis/ads'
import { useQuery } from 'react-query'


export default function FollowUser({ vendor, image, name })
{  
    // alert(vendor)
    const { data, isLoading, error, isError, refetch, isFetching } = useQuery([`user-followers`, vendor], () => getUserFollowers(vendor));
    if(!isLoading)
    {
      console.log(data)
    }

    const [isLoggedIn, setIsUserLoggedIn] = useState(false)
    const [userToken, setUserToken] = useState(localStorage.getItem("token"))
    const [msg, setMsg] = useState("")

    useEffect(() => {

    }, [msg])
  
    const follower = () => 
    {
        if(userToken != "" && userToken != undefined && userToken != null)
        {
            followUser({vendor: vendor})
            .then((res) => {
                console.log(res)
                refetch();
            })
            .catch((res) => {
            //  setLoading(false);
            //  setServerError(`${res}`);
            });
        } else {
            setMsg("You have to be logged in to follow")
            setTimeout(() => {
                setMsg("")
            }, 3000)
          }
    }
    

    return (
        <>
            <div className="flex justify-between mt-3"
            >
              <div className="flex justify-center items-center space-x-4">                              
                  <img className="w-14 h-14 rounded-full border border-10 border-green-500" src={`${AVATAR}${image}`} />
                  <p className="text-md text-blue-900">{" "} - {name}</p>
              </div>
              {/* { userToken != "" && userToken != undefined && userToken != null && */}
                  <button onClick={() => follower() } className="w-fit h-fit rounded-md p-2 text-white font-bold text-xs mt-2">
                      { (data > 0) ? <Flw /> : <UnFlw /> }
                  </button>
              {/* // } */}
            </div>
            {
              msg && <span className='p-2 bg-red-600 text-white text-red-500 w-full flex justify-center rounded'>{ msg } </span>
            }
        </>
  )

}

function Flw()
{
   return (
        <span className="p-3 rounded-lg bg-blue-600 w-full">Unfollow</span>
   )
}

function UnFlw()
{
   return (
        <span className="p-3 rounded-lg bg-green-600 w-full">Follow</span>
   )
}