import { Icons } from '@/util/icon'
import './right.css'
import { logOut } from '@/apis/auth'


export default function Right()
{    
    return (
        <div className='flex justify-items-end space-x-5 justify-end mr-5'>
            <div className=''
                onClick={logOut}
            >                
                <Icons iconName={'logout'} color='red' width={6} height={6} />
            </div>
        </div>
  )

}